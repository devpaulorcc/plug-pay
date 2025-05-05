import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInMemoryRepository } from '../repositories/user-in-memory.repository';
import { AuthenticationUserDto } from '../dtos/authentication-user.dto';
import { UserAuthenticatedDto } from '../dtos/user-authenticated.dto';
import { UserUnauthorized } from '../exceptions/user-unauthorized.exception';

@Injectable()
export class AuthenticationUserUseCase {
    constructor(
        private readonly userRepository: UserInMemoryRepository,
        private readonly jwtService: JwtService,
    ) {}

    public async execute(
        authenticationUserDto: AuthenticationUserDto,
    ): Promise<{ accessToken: string }> {
        const user: UserAuthenticatedDto | null =
            await this.userRepository.auth(authenticationUserDto);

        if (!user) {
            throw new UserUnauthorized(
                'Não foi possível encontrar nenhum usuário com essas credenciais.',
            );
        }

        const { plan, email, name } = user;
        const payload = { user: { name, email, plan } };

        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }
}
