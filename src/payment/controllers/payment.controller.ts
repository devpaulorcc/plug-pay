import { Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreatePaymentLinkUseCase } from '../use-cases/create-payment-link.use-case';

@Controller()
export class PaymentController {
    constructor(
        private readonly createPaymentLinkUseCase: CreatePaymentLinkUseCase,
    ) {}

    @Post('/payment')
    public async create(@Res() response: Response): Promise<Response> {
        return response.json(await this.createPaymentLinkUseCase.execute());
    }
}
