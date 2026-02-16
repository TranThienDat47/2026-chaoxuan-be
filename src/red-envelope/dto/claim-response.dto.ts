export class ClaimResponseDto {
    id: string;
    amount: number;
    message: string;
    qrCode: string;
    link?: string;
    claimedAt: Date;
}
