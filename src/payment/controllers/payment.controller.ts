import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreatePaymentLinkUseCase } from '../use-cases/create-payment-link.use-case';
import { PreferenceDto } from '../dtos/preference.dto';
import { CreatePaymentHtmlUseCase } from '../use-cases/create-payment-html.use-case';
import { CreatePaymentUseCase } from '../use-cases/create-payment.use-case';
import { BricksDto } from '../dtos/bricks.dto';
import { CardPayment } from '../dtos/card-payment.dto';

@Controller('/payment')
export class PaymentController {
    constructor(
        private readonly createPaymentLinkUseCase: CreatePaymentLinkUseCase,
        private readonly createPaymentHtmlUseCase: CreatePaymentHtmlUseCase,
        private readonly createPaymentUseCase: CreatePaymentUseCase,
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
        console.log(bricksDto);

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
}
