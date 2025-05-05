import { Injectable } from '@nestjs/common';
import { PaymentGatewayContract } from 'src/integration/contracts/payment-gateway.contract';
import { CreatePixPaymentPixDto } from '../dtos/payment-payload-pix.dto';
import { PaymentsInMemoryRepository } from '../repositories/payments-in-memory.repository';
import { PaymentEntity, PaymentStatus } from '../entity/payment.entity';

@Injectable()
export class CreatePaymentPixUseCase {
    constructor(
        private readonly paymentsService: PaymentGatewayContract,
        private readonly PaymentsRepository: PaymentsInMemoryRepository,
    ) {}

    public async execute(
        createPixPaymentPixDto: CreatePixPaymentPixDto,
    ): Promise<string> {
        const pixCode = await this.paymentsService.createPixCode(
            createPixPaymentPixDto,
        );

        const paymentEntity = new PaymentEntity();
        paymentEntity.userId = createPixPaymentPixDto.userId;
        paymentEntity.amount = createPixPaymentPixDto.transaction_amount;
        paymentEntity.status = PaymentStatus.PENDING;

        this.PaymentsRepository.regiter(paymentEntity);
        return pixCode;
    }
}
