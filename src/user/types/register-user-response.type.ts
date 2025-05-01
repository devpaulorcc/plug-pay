import { UserPlans } from '../entities/user.entity';

export type RegisterUserResponse = {
    name: string;
    email: string;
    plan: UserPlans;
};
