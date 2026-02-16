import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RedEnvelopeDocument = HydratedDocument<RedEnvelope>;

@Schema({ timestamps: true })
export class RedEnvelope {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  qrCode: string;

  @Prop({ default: false })
  isClaimed: boolean;

  @Prop()
  claimedAt: Date;

  @Prop()
  winnerIp: string; // Client reported IP

  @Prop()
  winnerConnectionIp: string; // Server observed IP

  @Prop()
  winnerSocketId: string;

  @Prop()
  index: number;

  @Prop()
  link: string;
}

export const RedEnvelopeSchema = SchemaFactory.createForClass(RedEnvelope);
