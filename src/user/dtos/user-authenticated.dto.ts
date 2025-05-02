import { UserPlans } from '../entities/user.entity';

export class UserAuthenticatedDto {
    public name: string;
    public email: string;
    public plan: UserPlans;
}
