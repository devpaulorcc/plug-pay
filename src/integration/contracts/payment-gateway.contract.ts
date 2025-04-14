import { PreferenceDto } from 'src/payment/dtos/preference.dto';

export interface CreateRedirectorResponse {
    url: string;
}

export abstract class PaymentGatewayContract {
    public abstract createRedirector(
        preferenceDto: PreferenceDto,
    ): Promise<CreateRedirectorResponse | Error>;
}
