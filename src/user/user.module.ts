import { Module } from '@nestjs/common';
import { RegisterUserUseCase } from './use-cases/register-user.use-case';
import { UserInMemoryRepository } from './repositories/user-in-memory.repository';
import { UserController } from './controllers/user.controller';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [RegisterUserUseCase, UserInMemoryRepository],
    exports: [],
})
export class UserModule {}
