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
import { randomUUID } from 'crypto';

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

    public async generateHtml(amount: number): Promise<string> {
        const publicKey = process.env.NEST_PUBLIC_MERCADO_PAGO_PUBLIC_KEY;

        if (!publicKey) {
            throw new Error('Chave pública do Mercado Pago não configurada');
        }

        const htmlForm = `
            <div id="form-checkout"></div>
    
            <script src="https://sdk.mercadopago.com/js/v2"></script>
            <script>
    window.onload = function () {
      const mp = new MercadoPago("${publicKey}", {
        locale: "pt-BR"
      });
  
      mp.bricks().create("cardPayment", "form-checkout", {
        initialization: {
          amount: ${amount}
        },
        callbacks: {
          onReady: () => {
            console.log("Checkout Bricks está pronto");
          },
          onSubmit: async (cardFormData) => {
            try {
                                const response = await fetch('http://localhost:3000/payment/charge', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(cardFormData),
                                });

                                const paymentResult = await response.json();
                            } catch (error) {
                                console.error("Erro ao processar pagamento:", error);
                            }
          },
          onError: (error) => {
            console.error("Erro no checkout:", error);
          }
        }
      });
    };
  </script>
        `;

        return htmlForm;
    }

    public async createPayment(paymentPayload: object): Promise<object> {
        const requestHeaders = {
            Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
            'X-Idempotency-Key': randomUUID(),
        };

        try {
            const responseApi = await this.httpClientService.send({
                method: 'POST',
                url: 'https://api.mercadopago.com/v1/payments',
                body: paymentPayload,
                headers: requestHeaders,
            });

            return responseApi.body;
        } catch (error) {
            throw new Error(`Erro ao criar pagamento: ${error.message}`);
        }
    }
}
