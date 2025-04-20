import { Injectable } from '@nestjs/common';
import { PaymentGatewayContract } from 'src/integration/contracts/payment-gateway.contract';

@Injectable()
export class CreatePaymentHtmlUseCase {
    constructor(private readonly paymentsService: PaymentGatewayContract) {}
    public async execute(amount: number): Promise<string> {
        return await this.paymentsService.generateHtml(amount);
    }
}
