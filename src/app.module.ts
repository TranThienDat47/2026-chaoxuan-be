import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { RedEnvelopeModule } from './red-envelope/red-envelope.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI') || process.env.DEFAUL_DB_MONGODB,
      }),
      inject: [ConfigService],
    }),
    RedEnvelopeModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
