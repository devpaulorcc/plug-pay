import { Injectable } from '@nestjs/common';
import { UserInMemoryRepository } from '../repositories/user-in-memory.repository';
import { PaymentsInMemoryRepository } from 'src/payment/repositories/payments-in-memory.repository';
import { PaymentEntity } from 'src/payment/entity/payment.entity';
@Injectable()
export class GetPaymentsUserUseCase {
    constructor(
        private readonly userRepository: UserInMemoryRepository,
        private readonly paymentsInMemoryRepository: PaymentsInMemoryRepository,
    ) {}

    public async execute(userId: string): Promise<Array<PaymentEntity>> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new Error('Usuário não existe com este ID');
        }

        const paymentsUser: Array<PaymentEntity> =
            await this.paymentsInMemoryRepository.getByUserId(userId);
        return paymentsUser;
    }
}
