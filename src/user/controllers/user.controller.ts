import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserUseCase } from '../use-cases/register-user.use-case';
import { RegisterUserDto } from '../dtos/register-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

    @Post()
    public async register(
        @Body() registerUserDto: RegisterUserDto,
    ): Promise<void> {
        try {
            await this.registerUserUseCase.execute(registerUserDto);
        } catch (error) {
            console.error('Erro:', error);
        }
        return;
    }
}
