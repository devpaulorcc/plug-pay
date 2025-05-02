import { Injectable } from '@nestjs/common';
import { UserInMemoryRepository } from '../repositories/user-in-memory.repository';
import { UserPlans, UserPlanStatus } from '../entities/user.entity';
@Injectable()
export class UpdateUserPlanUseCase {
    constructor(private readonly userRepository: UserInMemoryRepository) {}

    public async execute(userId: string): Promise<object> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new Error('Usuário não existe com este ID');
        }

        if (user.planStatus === UserPlanStatus.PAID) {
            throw new Error('Usuário já pagou pelo plano');
        }

        user.plan = UserPlans.PRO;
        user.planStatus = UserPlanStatus.PAID;
        await this.userRepository.updateUser(user);
        return user;
    }
}
