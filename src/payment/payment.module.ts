import { forwardRef, Module } from '@nestjs/common';
import { PaymentController } from './controllers/payment.controller';
import { PaymentGatewayContract } from 'src/integration/contracts/payment-gateway.contract';
import { MercadoPagoService } from 'src/integration/services/mercado-pago.service';
import { CoreModule } from 'src/core/core.module';
import { CreatePaymentLinkUseCase } from './use-cases/create-payment-link.use-case';

@Module({
    imports: [forwardRef(() => CoreModule)],
    controllers: [PaymentController],
    providers: [
        CreatePaymentLinkUseCase,
        {
            provide: PaymentGatewayContract,
            useClass: MercadoPagoService,
        },
    ],
})
export class PaymentModule {}
