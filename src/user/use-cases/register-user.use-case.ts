import { Injectable } from '@nestjs/common';
import { UserInMemoryRepository } from '../repositories/user-in-memory.repository';
import { UserEntity, UserPlans, UserPlanStatus } from '../entities/user.entity';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { HashingClientServiceContract } from 'src/core/contracts/hashing-client-service.contract';
import { RegisterUserResponse } from '../types/register-user-response.type';
@Injectable()
export class RegisterUserUseCase {
    constructor(
        private readonly hashingClientService: HashingClientServiceContract,
        private readonly userRepository: UserInMemoryRepository,
    ) {}

    public async execute(
        registerUserDto: RegisterUserDto,
    ): Promise<RegisterUserResponse> {
        const userEntity = new UserEntity();
        userEntity.name = registerUserDto.name;
        userEntity.email = registerUserDto.email;
        userEntity.password = await this.hashingClientService.hash(
            registerUserDto.password,
        );
        userEntity.plan = registerUserDto.plan;

        if (userEntity.plan === UserPlans.PRO) {
            userEntity.planStatus = UserPlanStatus.PENDING;
        }

        const registeredUser = await this.userRepository.register(userEntity);

        return {
            id: registeredUser.id,
            name: registeredUser.name,
            email: registeredUser.email,
            plan: registeredUser.plan,
        };
    }
}
