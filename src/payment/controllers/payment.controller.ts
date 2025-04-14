import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreatePaymentLinkUseCase } from '../use-cases/create-payment-link.use-case';
import { PreferenceDto } from '../dtos/preference.dto';

@Controller('/payment')
export class PaymentController {
    constructor(
        private readonly createPaymentLinkUseCase: CreatePaymentLinkUseCase,
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
}
