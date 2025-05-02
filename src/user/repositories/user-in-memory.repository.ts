import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { HashingClientServiceContract } from 'src/core/contracts/hashing-client-service.contract';
import { AuthenticationUserDto } from '../dtos/authentication-user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UserInMemoryRepository {
    constructor(
        private readonly hashingClientService: HashingClientServiceContract,
    ) {}

    private users: Array<UserEntity> = [];

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

    public async register(registerUser: UserEntity): Promise<UserEntity> {
        registerUser.id = randomUUID();
        await this.users.push(registerUser);
        return registerUser;
    }

    public async findById(userId: string): Promise<UserEntity | null> {
        const user = this.users.find((user) => user.id === userId);
        return user ?? null;
    }

    public async updateUser(
        updatedUser: UserEntity,
    ): Promise<UserEntity | null> {
        const index = this.users.findIndex(
            (user) => user.id === updatedUser.id,
        );

        if (index === -1) {
            return null;
        }

        this.users[index] = updatedUser;
        return this.users[index];
    }
}
