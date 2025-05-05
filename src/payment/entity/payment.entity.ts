export enum PaymentStatus {
    PENDING = 'PEN',
    APPROVED = 'APP',
    DECLINED = 'DEC',
    REFUNDED = 'REF',
}

export class PaymentEntity {
    public id: string;
    public userId: string;
    public amount: number;
    public status: PaymentStatus;
}
