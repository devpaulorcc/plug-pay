import { forwardRef, Module } from '@nestjs/common';
import { PaymentController } from './controllers/payment.controller';
import { PaymentGatewayContract } from 'src/integration/contracts/payment-gateway.contract';
import { MercadoPagoService } from 'src/integration/services/mercado-pago.service';
import { CoreModule } from 'src/core/core.module';
import { CreatePaymentLinkUseCase } from './use-cases/create-payment-link.use-case';
import { CreatePaymentHtmlUseCase } from './use-cases/create-payment-html.use-case';
import { CreatePaymentUseCase } from './use-cases/create-payment.use-case';

@Module({
    imports: [forwardRef(() => CoreModule)],
    controllers: [PaymentController],
    providers: [
        CreatePaymentLinkUseCase,
        CreatePaymentHtmlUseCase,
        CreatePaymentUseCase,
        {
            provide: PaymentGatewayContract,
            useClass: MercadoPagoService,
        },
    ],
})
export class PaymentModule {}
