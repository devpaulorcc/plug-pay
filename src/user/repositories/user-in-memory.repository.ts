import { Injectable } from '@nestjs/common';
import { UserEntity, UserPlans } from '../entities/user.entity';

@Injectable()
export class UserInMemoryRepository {
    private users: Array<UserEntity> = [
        {
            name: 'Paulo',
            email: 'paulo@gmail.com',
            password: '123123123',
            plan: UserPlans.PRO,
        },
    ];

    public async register(registerUser: UserEntity): Promise<void> {
        await this.users.push(registerUser);
        console.log('Users in memory:', this.users);
    }
}
