import {
    Body,
    Controller,
    HttpStatus,
    LoggerService,
    Post,
    Res,
} from '@nestjs/common';
import { RegisterUserUseCase } from '../use-cases/register-user.use-case';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { AuthenticationUserDto } from '../dtos/authentication-user.dto';
import { AuthenticationUserUseCase } from '../use-cases/authentication-user.use-case';
import { Response } from 'express';
import { UserUnauthorized } from '../exceptions/user-unauthorized.exception';

@Controller('user')
export class UserController {
    private readonly loggerService: LoggerService;

    constructor(
        private readonly authenticationUserUseCase: AuthenticationUserUseCase,
        private readonly registerUserUseCase: RegisterUserUseCase,
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
    ): Promise<void> {
        try {
            await this.registerUserUseCase.execute(registerUserDto);
        } catch (error) {
            this.loggerService.error(error.message);
        }
    }
}
