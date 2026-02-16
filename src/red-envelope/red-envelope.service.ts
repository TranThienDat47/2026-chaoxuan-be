import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RedEnvelope, RedEnvelopeDocument } from './schemas/red-envelope.schema';
import { CreateRedEnvelopeDto } from './dto/create-red-envelope.dto';
import { ClaimResponseDto } from './dto/claim-response.dto';
import * as QRCode from 'qrcode';
import { RedEnvelopeGateway } from './red-envelope.gateway';

@Injectable()
export class RedEnvelopeService {
    constructor(
        @InjectModel(RedEnvelope.name)
        private redEnvelopeModel: Model<RedEnvelopeDocument>,
        private redEnvelopeGateway: RedEnvelopeGateway,
    ) { }

    async create(createRedEnvelopeDto: CreateRedEnvelopeDto): Promise<{ created: number }> {
        const { count, minAmount, maxAmount, qrCode, link } = createRedEnvelopeDto;
        const envelopes: Partial<RedEnvelope>[] = [];

        const congratulationMessages = [
            'Chúc mừng năm mới! Vạn sự như ý!',
            'An khang thịnh vượng! Phát tài phát lộc!',
            'Sức khỏe dồi dào! Tiền vào như nước!',
            'Tài lộc đầy nhà! Hạnh phúc tràn đầy!',
            'Phúc lộc thọ! May mắn cả năm!',
            'Vạn sự hanh thông! Tài lộc vô biên!',
        ];

        for (let i = 0; i < count; i++) {
            const amount = Math.random() * (maxAmount - minAmount) + minAmount;
            const roundedAmount = Math.round(amount * 100) / 100;
            const message = congratulationMessages[Math.floor(Math.random() * congratulationMessages.length)];

            // Use provided QR code and link, or fallback to generated (if necessary, but user requested manual)
            // If user didn't provide, we could still generate, but for now let's prioritize the provided one.
            // If no unique link is needed per envelope, we use the static one.
            
            let finalQrCode = qrCode;
            let finalLink = link;

            // If link is provided, generate QR code from it
            if (link) {
                finalQrCode = await QRCode.toDataURL(link);
            } else if (!finalQrCode) {
                 // Fallback: Generate a default QR and link if neither provided
                 const tempId = Date.now().toString() + '-' + i;
                 const qrData = `https://example.com/redeem?amount=${roundedAmount}&id=${tempId}`;
                 finalQrCode = await QRCode.toDataURL(qrData);
                 finalLink = qrData; // Set link to the generated one
            }

            envelopes.push({
                amount: roundedAmount,
                message,
                qrCode: finalQrCode,
                link: finalLink,
                index: i, // Assign fixed index 0 to count-1
            });
        }

        await this.redEnvelopeModel.insertMany(envelopes);
        return { created: envelopes.length };
    }

    async claim(clientIp: string, requestIp: string, socketId: string): Promise<ClaimResponseDto> {
        // 1. Check if Client IP has already claimed (if valid)
        if (clientIp && clientIp !== 'unknown') {
            const existingClientIpClaim = await this.redEnvelopeModel.countDocuments({ winnerIp: clientIp, isClaimed: true });
            if (existingClientIpClaim > 0) {
                 throw new BadRequestException('Bạn đã nhận lì xì rồi! (Mã lỗi: IP-C)'); 
            }
        }

        // 2. Check if Connection IP has already claimed
        // This prevents bypassing by failing the client-side IP fetch
        if (requestIp) {
            const existingConnIpClaim = await this.redEnvelopeModel.countDocuments({ winnerConnectionIp: requestIp, isClaimed: true });
            if (existingConnIpClaim > 0) {
                 throw new BadRequestException('Bạn đã nhận lì xì rồi! (Mã lỗi: IP-S)'); 
            }
        }

        // 3. Socket ID check removed as per user request (network address focus)
        // if (socketId) { ... }

        // Find a random unclaimed envelope
        // Use aggregation to sample one random document
        const unwrappedEnvelopes = await this.redEnvelopeModel.aggregate([
            { $match: { isClaimed: false } },
            { $sample: { size: 1 } }
        ]);

        if (!unwrappedEnvelopes || unwrappedEnvelopes.length === 0) {
            throw new NotFoundException('Không còn lì xì nào! Hết rồi bạn ơi 😢');
        }

        const selectedEnvelopeData = unwrappedEnvelopes[0];
        
        // We need to update it. hydrate() creates a mongoose document from the plain object
        const selectedEnvelope = await this.redEnvelopeModel.findById(selectedEnvelopeData._id);

        if (!selectedEnvelope) {
             throw new NotFoundException('Không tìm thấy lì xì!');
        }

        // Mark as claimed
        selectedEnvelope.isClaimed = true;
        selectedEnvelope.claimedAt = new Date();
        selectedEnvelope.winnerIp = clientIp;
        selectedEnvelope.winnerConnectionIp = requestIp;
        selectedEnvelope.winnerSocketId = socketId;
        await selectedEnvelope.save();

        // Notify real-time clients
        const remaining = await this.redEnvelopeModel.countDocuments({ isClaimed: false });
        
        // Broadcast available indices
        const availableEnvelopes = await this.redEnvelopeModel.find({ isClaimed: false }).select('index').exec();
        const indices = availableEnvelopes.map(e => e.index).sort((a, b) => a - b);

        this.redEnvelopeGateway.notifyEnvelopeUpdate(remaining, indices);
        this.redEnvelopeGateway.notifyEnvelopeClaimed(selectedEnvelope._id.toString());

        return {
            id: selectedEnvelope._id.toString(),
            amount: selectedEnvelope.amount,
            message: selectedEnvelope.message,
            qrCode: selectedEnvelope.qrCode,
            link: selectedEnvelope.link,
            claimedAt: selectedEnvelope.claimedAt,
        };
    }

    async getStats(): Promise<{ total: number; claimed: number; remaining: number; indices: number[] }> {
        const total = await this.redEnvelopeModel.countDocuments();
        const claimed = await this.redEnvelopeModel.countDocuments({ isClaimed: true });
        
        // Get list of available indices
        const availableEnvelopes = await this.redEnvelopeModel.find({ isClaimed: false }).select('index').exec();
        const indices = availableEnvelopes.map(e => e.index).sort((a, b) => a - b);

        return {
            total,
            claimed,
            remaining: total - claimed,
            indices,
        };
    }
}
