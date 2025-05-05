import { Injectable } from '@nestjs/common';
import { PaymentEntity } from '../entity/payment.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class PaymentsInMemoryRepository {
    private payments: Array<PaymentEntity> = [];

    public async getByUserId(userId: string): Promise<Array<PaymentEntity>> {
        return this.payments.filter((payment) => payment.userId === userId);
    }

    public async regiter(paymentEntity: PaymentEntity): Promise<void> {
        paymentEntity.id = randomUUID();
        this.payments.push(paymentEntity);
        console.log('Registrado novo pagamento', paymentEntity);
    }
}
