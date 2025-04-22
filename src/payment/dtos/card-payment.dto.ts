export enum CardMethod {
    VISA = 'visa',
}

export enum CardIdentification {
    CPF = 'CPF',
    CNPJ = 'CNPJ',
}

export class CardPayment {
    public token: string;
    public issuer_id: string;
    public payment_method_id: CardMethod.VISA;
    public transaction_amount: number;
    public installments: number;
    public payer: {
        email: string;
        identification: { type: CardIdentification.CPF; number: string };
    };
}
