import { Injectable } from '@nestjs/common';
import { UserInMemoryRepository } from '../repositories/user-in-memory.repository';
import { UserEntity, UserPlans } from '../entities/user.entity';
import { RegisterUserDto } from '../dtos/register-user.dto';

@Injectable()
export class RegisterUserUseCase {
    constructor(private readonly userRepository: UserInMemoryRepository) {}

    public async execute(registerUserDto: RegisterUserDto): Promise<void> {
        const userEntity = new UserEntity();
        userEntity.name = registerUserDto.name;
        userEntity.email = registerUserDto.email;
        userEntity.password = registerUserDto.password;
        userEntity.plan = UserPlans.FREE;

        await this.userRepository.register(userEntity);
    }
}
