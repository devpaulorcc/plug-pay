import { Injectable } from '@nestjs/common';
import { PaymentGatewayContract } from 'src/integration/contracts/payment-gateway.contract';
import { BricksDto } from '../dtos/bricks.dto';

@Injectable()
export class CreatePaymentHtmlUseCase {
    constructor(private readonly paymentsService: PaymentGatewayContract) {}
    public async execute(bricksDto: BricksDto): Promise<string> {
        return await this.paymentsService.generateHtml(bricksDto.amount);
    }
}
