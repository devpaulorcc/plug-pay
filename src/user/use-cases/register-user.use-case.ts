import { Injectable } from '@nestjs/common';
import { UserInMemoryRepository } from '../repositories/user-in-memory.repository';
import { UserEntity, UserPlans } from '../entities/user.entity';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { HashingClientServiceContract } from 'src/core/contracts/hashing-client-service.contract';
@Injectable()
export class RegisterUserUseCase {
    constructor(
        private readonly hashingClientService: HashingClientServiceContract,
        private readonly userRepository: UserInMemoryRepository,
    ) {}

    public async execute(registerUserDto: RegisterUserDto): Promise<void> {
        const userEntity = new UserEntity();
        userEntity.name = registerUserDto.name;
        userEntity.email = registerUserDto.email;
        userEntity.password = await this.hashingClientService.hash(
            registerUserDto.password,
        );
        userEntity.plan = UserPlans.FREE;

        await this.userRepository.register(userEntity);
    }
}
