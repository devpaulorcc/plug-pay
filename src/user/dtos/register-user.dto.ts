import { UserPlans } from '../entities/user.entity';

export class RegisterUserDto {
    public name: string;
    public email: string;
    public password: string;
    public plan: UserPlans;
}
