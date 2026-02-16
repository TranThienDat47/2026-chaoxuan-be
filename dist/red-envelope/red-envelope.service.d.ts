import { Model } from 'mongoose';
import { RedEnvelopeDocument } from './schemas/red-envelope.schema';
import { CreateRedEnvelopeDto } from './dto/create-red-envelope.dto';
import { ClaimResponseDto } from './dto/claim-response.dto';
import { RedEnvelopeGateway } from './red-envelope.gateway';
export declare class RedEnvelopeService {
    private redEnvelopeModel;
    private redEnvelopeGateway;
    constructor(redEnvelopeModel: Model<RedEnvelopeDocument>, redEnvelopeGateway: RedEnvelopeGateway);
    create(createRedEnvelopeDto: CreateRedEnvelopeDto): Promise<{
        created: number;
    }>;
    claim(clientIp: string, requestIp: string, socketId: string): Promise<ClaimResponseDto>;
    getStats(): Promise<{
        total: number;
        claimed: number;
        remaining: number;
        indices: number[];
    }>;
}
