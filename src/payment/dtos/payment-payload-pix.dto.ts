export class CreatePixPaymentPixDto {
    public userId: string;
    public transaction_amount: number;
    public description: string;
    public payment_method_id: 'pix';
    public payer: {
        email: string;
        first_name: string;
        last_name: string;
        identification: {
            type: 'CPF' | 'CNPJ';
            number: string;
        };
        address?: {
            zip_code?: string;
            street_name?: string;
            street_number?: string;
            neighborhood?: string;
            city?: string;
            federal_unit?: string;
        };
    };
    public notification_url?: string;
    public external_reference?: string;
}
