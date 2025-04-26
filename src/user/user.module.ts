import { Module } from '@nestjs/common';
import { RegisterUserUseCase } from './use-cases/register-user.use-case';
import { UserInMemoryRepository } from './repositories/user-in-memory.repository';
import { UserController } from './controllers/user.controller';
import { HashingClientServiceContract } from 'src/core/contracts/hashing-client-service.contract';
import { BcryptService } from 'src/core/services/bcrypt.service';
import { AuthenticationUserUseCase } from './use-cases/authentication-user.use-case';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [
        RegisterUserUseCase,
        AuthenticationUserUseCase,
        UserInMemoryRepository,
        {
            provide: HashingClientServiceContract,
            useClass: BcryptService,
        },
    ],
    exports: [],
})
export class UserModule {}
