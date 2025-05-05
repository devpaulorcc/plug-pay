import {
    Body,
    Controller,
    HttpStatus,
    LoggerService,
    Param,
    Post,
    Res,
    UseGuards,
} from '@nestjs/common';
import { RegisterUserUseCase } from '../use-cases/register-user.use-case';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { AuthenticationUserDto } from '../dtos/authentication-user.dto';
import { AuthenticationUserUseCase } from '../use-cases/authentication-user.use-case';
import { Response } from 'express';
import { UserUnauthorized } from '../exceptions/user-unauthorized.exception';
import { UpdateUserPlanUseCase } from '../use-cases/update-user-plan.use-case';
import { GetPaymentsUserUseCase } from '../use-cases/get-payments-user.use-case';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('user')
export class UserController {
    private readonly loggerService: LoggerService;

    constructor(
        private readonly authenticationUserUseCase: AuthenticationUserUseCase,
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly updateUserPlanUseCase: UpdateUserPlanUseCase,
        private readonly getPaymentsUserUseCase: GetPaymentsUserUseCase,
    ) {}

    @Post('/auth')
    public async authentication(
        @Body() authenticationUserDto: AuthenticationUserDto,
        @Res() response: Response,
    ): Promise<Response> {
        try {
            const user = await this.authenticationUserUseCase.execute(
                authenticationUserDto,
            );
            return response.status(HttpStatus.OK).json(user);
        } catch (error) {
            if (error instanceof UserUnauthorized) {
                return response
                    .status(HttpStatus.UNAUTHORIZED)
                    .json({ message: error.message });
            }

            return response
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json(error);
        }
    }

    @Post()
    public async register(
        @Body() registerUserDto: RegisterUserDto,
        @Res() response: Response,
    ): Promise<Response> {
        try {
            const user =
                await this.registerUserUseCase.execute(registerUserDto);
            return response.status(HttpStatus.CREATED).json({ user });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json(error.message);
        }
    }

    @Post('/plan/:id')
    public async updatePlan(
        @Param('id') userId: string,
        @Res() response: Response,
    ): Promise<Response> {
        try {
            const updatedUser =
                await this.updateUserPlanUseCase.execute(userId);
            return response.status(HttpStatus.OK).json({
                user: updatedUser,
            });
        } catch (error) {
            return response
                .status(HttpStatus.BAD_REQUEST)
                .json({ message: error.message });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('/:userId')
    public async getPayments(
        @Param('userId') userId: string,
        @Res() response: Response,
    ): Promise<Response> {
        try {
            const paymentsUser =
                await this.getPaymentsUserUseCase.execute(userId);
            return response.status(HttpStatus.OK).json({
                payments: paymentsUser,
            });
        } catch (error) {
            return response
                .status(HttpStatus.BAD_REQUEST)
                .json({ message: error.message });
        }
    }
}
