import { Controller, Post, Body, Get, Req, Ip } from '@nestjs/common';
import { RedEnvelopeService } from './red-envelope.service';
import { CreateRedEnvelopeDto } from './dto/create-red-envelope.dto';
import { ClaimResponseDto } from './dto/claim-response.dto';
import { Request } from 'express';

@Controller('red-envelopes')
export class RedEnvelopeController {
    constructor(private readonly redEnvelopeService: RedEnvelopeService) { }

    @Post()
    create(@Body() createRedEnvelopeDto: CreateRedEnvelopeDto) {
        return this.redEnvelopeService.create(createRedEnvelopeDto);
    }

    @Post('claim')
    claim(
        @Body('ip') clientIp: string, 
        @Body('socketId') socketId: string,
        @Req() req: any, // Use any to avoid type import issues with decorators if not critical
        @Ip() requestIp: string
    ): Promise<ClaimResponseDto> {
        // Use client-provided IP (public) if available, otherwise fallback to request IP (local/proxy)
        // Check both if possible? 
        // Let's rely on the most "real" one. Client IP from ipify is good for public identity.
        // Request IP is good for local network.
        
        console.log(`Claim Request - ClientIP: ${clientIp}, RequestIP: ${requestIp}, SocketID: ${socketId}`);
        
        return this.redEnvelopeService.claim(clientIp, requestIp, socketId);
    }

    @Get('stats')
    getStats() {
        return this.redEnvelopeService.getStats();
    }
}
