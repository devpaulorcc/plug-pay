import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { RegisterUserUseCase } from './use-cases/register-user.use-case';
import { AuthenticationUserUseCase } from './use-cases/authentication-user.use-case';
import { UpdateUserPlanUseCase } from './use-cases/update-user-plan.use-case';
import { UserInMemoryRepository } from './repositories/user-in-memory.repository';
import { UserController } from './controllers/user.controller';

import { HashingClientServiceContract } from 'src/core/contracts/hashing-client-service.contract';
import { BcryptService } from 'src/core/services/bcrypt.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GetPaymentsUserUseCase } from './use-cases/get-payments-user.use-case';
import { PaymentsInMemoryRepository } from 'src/payment/repositories/payments-in-memory.repository';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' },
        }),
        PaymentModule,
    ],
    controllers: [UserController],
    providers: [
        RegisterUserUseCase,
        AuthenticationUserUseCase,
        UpdateUserPlanUseCase,
        GetPaymentsUserUseCase,
        UserInMemoryRepository,
        PaymentsInMemoryRepository,
        {
            provide: HashingClientServiceContract,
            useClass: BcryptService,
        },
        JwtStrategy,
    ],
})
export class UserModule {}
