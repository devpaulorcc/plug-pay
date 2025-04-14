import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PreferenceDto } from 'src/payment/dtos/preference.dto';
import {
    PaymentGatewayContract,
    CreateRedirectorResponse,
} from '../contracts/payment-gateway.contract';

@Injectable()
export class MercadoPagoService implements PaymentGatewayContract {
    public async createRedirector(
        preferenceDto: PreferenceDto,
    ): Promise<CreateRedirectorResponse | Error> {
        try {
            const responseApi = await axios.post(
                'https://api.mercadopago.com/checkout/preferences',
                preferenceDto,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
                        'Content-Type': 'application/json',
                    },
                },
            );

            const url: CreateRedirectorResponse = responseApi.data.init_point;

            return url;
        } catch (error) {
            console.error(error.response?.data || error.message);
            return error;
        }
    }
}
