import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreatePaymentLinkUseCase } from '../use-cases/create-payment-link.use-case';
import { PreferenceDto } from '../dtos/preference.dto';
import { CreatePaymentHtmlUseCase } from '../use-cases/create-payment-html.use-case';
import { CreatePaymentUseCase } from '../use-cases/create-payment.use-case';

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
            return response.json({ success: true, url });
        } catch (error) {
            return response.json({ success: false, error });
        }
    }

    @Get('/form')
    public async getBricksForm(
        @Query('amount') amount: number,
    ): Promise<string> {
        return await this.createPaymentHtmlUseCase.execute(Number(amount));
    }

    @Post('/process')
    public async processPaymentWithBricks(
        @Body() cardFormData: object,
    ): Promise<object> {
        console.log(await this.createPaymentUseCase.execute(cardFormData));

        return await this.createPaymentUseCase.execute(cardFormData);
    }
}
