import { Injectable } from '@nestjs/common';
import { PaymentGatewayContract } from 'src/integration/contracts/payment-gateway.contract';
import { PreferenceDto } from '../dtos/preference.dto';

@Injectable()
export class CreatePaymentLinkUseCase {
    constructor(private readonly paymentsService: PaymentGatewayContract) {}

    public async execute(preferenceDto: PreferenceDto): Promise<object> {
        return this.paymentsService.createRedirector(preferenceDto);
    }
}
