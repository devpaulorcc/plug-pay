import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreatePaymentLinkUseCase } from '../use-cases/create-payment-link.use-case';
import { PreferenceDto } from '../dtos/preference.dto';
import { CreatePaymentHtmlUseCase } from '../use-cases/create-payment-html.use-case';
import { CreatePaymentUseCase } from '../use-cases/create-payment.use-case';
import { BricksDto } from '../dtos/bricks.dto';
import { CardPayment } from '../dtos/card-payment.dto';
import { CreatePixPaymentPixDto } from '../dtos/payment-payload-pix.dto';
import { CreatePaymentPixUseCase } from '../use-cases/create-payment-pix.use-case';

@Controller('/payment')
export class PaymentController {
    constructor(
        private readonly createPaymentLinkUseCase: CreatePaymentLinkUseCase,
        private readonly createPaymentHtmlUseCase: CreatePaymentHtmlUseCase,
        private readonly createPaymentUseCase: CreatePaymentUseCase,
        private readonly createPaymentPixUseCase: CreatePaymentPixUseCase,
    ) {}

    @Post()
    public async create(
        @Res() response: Response,
        @Body() preferenceDto: PreferenceDto,
    ): Promise<Response> {
        try {
            const url =
                await this.createPaymentLinkUseCase.execute(preferenceDto);
            return response.json({ url });
        } catch (error) {
            return response.json({ error });
        }
    }

    @Post('/form')
    public async getBricksForm(
        @Res() response: Response,
        @Body() bricksDto: BricksDto,
    ): Promise<Response> {
        try {
            const formPayment =
                await this.createPaymentHtmlUseCase.execute(bricksDto);
            return response.json({ formPayment });
        } catch (error) {
            return response.json({ error });
        }
    }

    @Post('/charge')
    public async processPaymentWithBricks(
        @Body() cardPayment: CardPayment,
    ): Promise<object> {
        return await this.createPaymentUseCase.execute(cardPayment);
    }

    // TODO:Make a paid plan inquiry
    @Post('/plans')
    public async planos(): Promise<object> {
        return {
            price: 1,
            transactionAmount: 1,
            description: 'Compra de plano PRO na PayJS.',
        };
    }

    @Post('/pix')
    public async generatePix(
        @Res() response: Response,
        @Body() createPixPaymentPixDto: CreatePixPaymentPixDto,
    ): Promise<Response> {
        try {
            const pix = await this.createPaymentPixUseCase.execute(
                createPixPaymentPixDto,
            );
            return response.json({ pix });
        } catch (error) {
            return response.json({ error });
        }
    }
}
