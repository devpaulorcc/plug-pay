import { Injectable } from '@nestjs/common';
import { UserInMemoryRepository } from '../repositories/user-in-memory.repository';
import { AuthenticationUserDto } from '../dtos/authentication-user.dto';
import { UserAuthenticatedDto } from '../dtos/user-authenticated.dto';
import { UserUnauthorized } from '../exceptions/user-unauthorized.exception';

@Injectable()
export class AuthenticationUserUseCase {
    constructor(private readonly userRepository: UserInMemoryRepository) {}

    public async execute(
        authenticationUserDto: AuthenticationUserDto,
    ): Promise<UserAuthenticatedDto> {
        const user: UserAuthenticatedDto | null =
            await this.userRepository.auth(authenticationUserDto);

        if (!user) {
            throw new UserUnauthorized(
                'Não foi possível encontrar nenhum usuário com essas credenciais.',
            );
        }
        const authenticatedUser = new UserAuthenticatedDto();
        authenticatedUser.name = user.name;
        authenticatedUser.email = user.email;
        authenticatedUser.plan = user.plan;

        return authenticatedUser;
    }
}
