import { Injectable } from '@nestjs/common';
import { PaymentGatewayContract } from 'src/integration/contracts/payment-gateway.contract';
import { PreferenceDto, Currency } from '../dtos/preference.dto';

@Injectable()
export class CreatePaymentLinkUseCase {
    constructor(private readonly paymentsService: PaymentGatewayContract) {}

    public async execute(): Promise<object> {
        const preference = new PreferenceDto({
            items: [
                {
                    title: 'Produto Exemplo',
                    quantity: 1,
                    currency_id: Currency.BRL,
                    unit_price: 2,
                },
            ],
            back_urls: {
                success: 'http://localhost:3000/success',
                failure: 'http://localhost:3000/failure',
            },
            auto_return: 'approved',
        });

        return this.paymentsService.createRedirector(preference);
    }
}
