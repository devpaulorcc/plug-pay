import { Injectable } from '@nestjs/common';
import { UserEntity, UserPlans } from '../entities/user.entity';
import { HashingClientServiceContract } from 'src/core/contracts/hashing-client-service.contract';
import { AuthenticationUserDto } from '../dtos/authentication-user.dto';

@Injectable()
export class UserInMemoryRepository {
    constructor(
        private readonly hashingClientService: HashingClientServiceContract,
    ) {}

    private users: Array<UserEntity> = [
        {
            name: 'Paulo',
            email: 'paulo@gmail.com',
            password: '123123123',
            plan: UserPlans.PRO,
        },
    ];

    public async auth(
        authenticationUserDto: AuthenticationUserDto,
    ): Promise<UserEntity | null> {
        for (const user of this.users) {
            const isPasswordCorrect = await this.hashingClientService.compare(
                authenticationUserDto.password,
                user.password,
            );

            if (
                user.email === authenticationUserDto.email &&
                isPasswordCorrect
            ) {
                return user;
            }
        }

        return null;
    }

    public async register(registerUser: UserEntity): Promise<void> {
        await this.users.push(registerUser);
    }
}
