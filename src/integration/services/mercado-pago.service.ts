import { Injectable } from '@nestjs/common';
import { PreferenceDto } from 'src/payment/dtos/preference.dto';
import {
    PaymentGatewayContract,
    CreateRedirectorResponse,
} from '../contracts/payment-gateway.contract';
import { LoggerService } from 'src/core/services/logger.service';
import {
    HttpClientServiceContract,
    Response,
} from 'src/core/contracts/http-client-service.contract';

@Injectable()
export class MercadoPagoService implements PaymentGatewayContract {
    private readonly loggerService = new LoggerService(
        PaymentGatewayContract.name,
    );

    constructor(
        private readonly httpClientService: HttpClientServiceContract,
    ) {}

    public async createRedirector(
        preferenceDto: PreferenceDto,
    ): Promise<CreateRedirectorResponse | Error> {
        let responseApi: Response;

        try {
            const requestHeaders = {
                Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            };

            responseApi = await this.httpClientService.send({
                method: 'POST',
                url: 'https://api.mercadopago.com/checkout/preferences',
                body: preferenceDto,
                headers: requestHeaders,
            });
            const responseBody = responseApi.body;

            const url: CreateRedirectorResponse = responseBody.init_point;
            this.loggerService.log('Pagamento criado');
            return url;
        } catch (error) {
            this.loggerService.error(
                `Erro ao criar pagamento: ${error.message}`,
            );
            return error;
        }
    }
}
