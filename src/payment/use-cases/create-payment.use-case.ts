import { Injectable } from '@nestjs/common';
import { PaymentGatewayContract } from 'src/integration/contracts/payment-gateway.contract';
import { CardPayment } from '../dtos/card-payment.dto';

@Injectable()
export class CreatePaymentUseCase {
    constructor(private readonly paymentsService: PaymentGatewayContract) {}

    public async execute(cardPayment: CardPayment): Promise<object> {
        const payload = {
            token: cardPayment.token,
            issuer_id: cardPayment.issuer_id,
            payment_method_id: cardPayment.payment_method_id,
            transaction_amount: cardPayment.transaction_amount,
            installments: cardPayment.installments,
            payer: {
                email: cardPayment.payer.email,
                identification: {
                    type: cardPayment.payer.identification.type,
                    number: cardPayment.payer.identification.number,
                },
            },
        };

        return await this.paymentsService.createPayment(payload);
    }
}
