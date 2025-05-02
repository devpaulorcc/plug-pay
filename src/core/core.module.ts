import { Module } from '@nestjs/common';
import { PaymentModule } from 'src/payment/payment.module';
import { HttpClientServiceContract } from './contracts/http-client-service.contract';
import { AxiosService } from './services/axios.service';
import { LoggerService } from './services/logger.service';
import { PaymentGatewayContract } from 'src/integration/contracts/payment-gateway.contract';
import { MercadoPagoService } from 'src/integration/services/mercado-pago.service';
import { UserModule } from 'src/user/user.module';
import { HashingClientServiceContract } from './contracts/hashing-client-service.contract';
import { BcryptService } from './services/bcrypt.service';

@Module({
    imports: [PaymentModule, UserModule],
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
        {
            provide: HashingClientServiceContract,
            useClass: BcryptService,
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
        {
            provide: HashingClientServiceContract,
            useClass: BcryptService,
        },
    ],
})
export class CoreModule {}
