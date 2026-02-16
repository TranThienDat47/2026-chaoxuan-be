import { IsNumber, IsPositive, Min, IsString, IsOptional } from 'class-validator';

export class CreateRedEnvelopeDto {
    @IsNumber()
    @IsPositive()
    @Min(1)
    count: number;

    @IsNumber()
    @IsPositive()
    minAmount: number;

    @IsNumber()
    @IsPositive()
    maxAmount: number;

    @IsOptional()
    @IsString()
    qrCode?: string;

    @IsOptional()
    @IsString()
    link?: string;
}
