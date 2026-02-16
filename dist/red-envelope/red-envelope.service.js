"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedEnvelopeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const red_envelope_schema_1 = require("./schemas/red-envelope.schema");
const QRCode = __importStar(require("qrcode"));
const red_envelope_gateway_1 = require("./red-envelope.gateway");
let RedEnvelopeService = class RedEnvelopeService {
    redEnvelopeModel;
    redEnvelopeGateway;
    constructor(redEnvelopeModel, redEnvelopeGateway) {
        this.redEnvelopeModel = redEnvelopeModel;
        this.redEnvelopeGateway = redEnvelopeGateway;
    }
    async create(createRedEnvelopeDto) {
        const { count, minAmount, maxAmount, qrCode, link } = createRedEnvelopeDto;
        const envelopes = [];
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
            let finalQrCode = qrCode;
            let finalLink = link;
            if (link) {
                finalQrCode = await QRCode.toDataURL(link);
            }
            else if (!finalQrCode) {
                const tempId = Date.now().toString() + '-' + i;
                const qrData = `https://example.com/redeem?amount=${roundedAmount}&id=${tempId}`;
                finalQrCode = await QRCode.toDataURL(qrData);
                finalLink = qrData;
            }
            envelopes.push({
                amount: roundedAmount,
                message,
                qrCode: finalQrCode,
                link: finalLink,
                index: i,
            });
        }
        await this.redEnvelopeModel.insertMany(envelopes);
        return { created: envelopes.length };
    }
    async claim(clientIp, requestIp, socketId) {
        if (clientIp && clientIp !== 'unknown') {
            const existingClientIpClaim = await this.redEnvelopeModel.countDocuments({ winnerIp: clientIp, isClaimed: true });
            if (existingClientIpClaim > 0) {
                throw new common_1.BadRequestException('Bạn đã nhận lì xì rồi! (Mã lỗi: IP-C)');
            }
        }
        if (requestIp) {
            const existingConnIpClaim = await this.redEnvelopeModel.countDocuments({ winnerConnectionIp: requestIp, isClaimed: true });
            if (existingConnIpClaim > 0) {
                throw new common_1.BadRequestException('Bạn đã nhận lì xì rồi! (Mã lỗi: IP-S)');
            }
        }
        const unwrappedEnvelopes = await this.redEnvelopeModel.aggregate([
            { $match: { isClaimed: false } },
            { $sample: { size: 1 } }
        ]);
        if (!unwrappedEnvelopes || unwrappedEnvelopes.length === 0) {
            throw new common_1.NotFoundException('Không còn lì xì nào! Hết rồi bạn ơi 😢');
        }
        const selectedEnvelopeData = unwrappedEnvelopes[0];
        const selectedEnvelope = await this.redEnvelopeModel.findById(selectedEnvelopeData._id);
        if (!selectedEnvelope) {
            throw new common_1.NotFoundException('Không tìm thấy lì xì!');
        }
        selectedEnvelope.isClaimed = true;
        selectedEnvelope.claimedAt = new Date();
        selectedEnvelope.winnerIp = clientIp;
        selectedEnvelope.winnerConnectionIp = requestIp;
        selectedEnvelope.winnerSocketId = socketId;
        await selectedEnvelope.save();
        const remaining = await this.redEnvelopeModel.countDocuments({ isClaimed: false });
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
    async getStats() {
        const total = await this.redEnvelopeModel.countDocuments();
        const claimed = await this.redEnvelopeModel.countDocuments({ isClaimed: true });
        const availableEnvelopes = await this.redEnvelopeModel.find({ isClaimed: false }).select('index').exec();
        const indices = availableEnvelopes.map(e => e.index).sort((a, b) => a - b);
        return {
            total,
            claimed,
            remaining: total - claimed,
            indices,
        };
    }
};
exports.RedEnvelopeService = RedEnvelopeService;
exports.RedEnvelopeService = RedEnvelopeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(red_envelope_schema_1.RedEnvelope.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        red_envelope_gateway_1.RedEnvelopeGateway])
], RedEnvelopeService);
//# sourceMappingURL=red-envelope.service.js.map