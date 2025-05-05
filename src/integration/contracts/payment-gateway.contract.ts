import { PreferenceDto } from 'src/payment/dtos/preference.dto';

export interface CreateRedirectorResponse {
    url: string;
}

export abstract class PaymentGatewayContract {
    public abstract createRedirector(
        preferenceDto: PreferenceDto,
    ): Promise<CreateRedirectorResponse | Error>;

    public abstract generateHtml(amount: number): Promise<string>;

    public abstract createPayment(paymentPayload: object): Promise<object>;

    public abstract createPixCode(paymentPayload: object): Promise<string>;
}
