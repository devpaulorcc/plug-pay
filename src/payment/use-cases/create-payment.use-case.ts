import { Injectable } from '@nestjs/common';
import { PaymentGatewayContract } from 'src/integration/contracts/payment-gateway.contract';

@Injectable()
export class CreatePaymentUseCase {
    constructor(private readonly paymentsService: PaymentGatewayContract) {}

    public async execute(cardFormData: any): Promise<object> {
        const payload = {
            token: cardFormData.token,
            issuer_id: cardFormData.issuerId,
            payment_method_id: cardFormData.paymentMethodId,
            transaction_amount: cardFormData.transactionAmount ?? 100,
            installments: cardFormData.installments ?? 1,
            payer: {
                email: cardFormData.payer.email,
                identification: {
                    type: cardFormData.payer.identification.type,
                    number: cardFormData.payer.identification.number,
                },
            },
        };

        return await this.paymentsService.createPayment(payload);
    }
}
