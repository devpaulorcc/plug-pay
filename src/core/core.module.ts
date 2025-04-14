import { Module } from '@nestjs/common';
import { PaymentModule } from 'src/payment/payment.module';
import { HttpClientServiceContract } from './contracts/http-client-service.contract';
import { AxiosService } from './services/axios.service';
import { LoggerService } from './services/logger.service';
import { PaymentGatewayContract } from 'src/integration/contracts/payment-gateway.contract';
import { MercadoPagoService } from 'src/integration/services/mercado-pago.service';

@Module({
    imports: [PaymentModule],
    controllers: [],
    providers: [
        LoggerService,
        {
            provide: HttpClientServiceContract,
            useClass: AxiosService,
        },
        {
            provide: PaymentGatewayContract,
            useClass: MercadoPagoService,
        },
    ],
    exports: [
        {
            provide: HttpClientServiceContract,
            useClass: AxiosService,
        },
        {
            provide: PaymentGatewayContract,
            useClass: MercadoPagoService,
        },
    ],
})
export class CoreModule {}
