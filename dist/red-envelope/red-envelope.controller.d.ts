import { RedEnvelopeService } from './red-envelope.service';
import { CreateRedEnvelopeDto } from './dto/create-red-envelope.dto';
import { ClaimResponseDto } from './dto/claim-response.dto';
export declare class RedEnvelopeController {
    private readonly redEnvelopeService;
    constructor(redEnvelopeService: RedEnvelopeService);
    create(createRedEnvelopeDto: CreateRedEnvelopeDto): Promise<{
        created: number;
    }>;
    claim(clientIp: string, socketId: string, req: any, requestIp: string): Promise<ClaimResponseDto>;
    getStats(): Promise<{
        total: number;
        claimed: number;
        remaining: number;
        indices: number[];
    }>;
}
