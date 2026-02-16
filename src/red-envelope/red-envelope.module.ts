import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RedEnvelopeService } from './red-envelope.service';
import { RedEnvelopeController } from './red-envelope.controller';
import { RedEnvelopeGateway } from './red-envelope.gateway';
import { RedEnvelope, RedEnvelopeSchema } from './schemas/red-envelope.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: RedEnvelope.name, schema: RedEnvelopeSchema }]),
    ],
    controllers: [RedEnvelopeController],
    providers: [RedEnvelopeService, RedEnvelopeGateway],
})
export class RedEnvelopeModule { }
