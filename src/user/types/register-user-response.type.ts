import { UserPlans } from '../entities/user.entity';

export type RegisterUserResponse = {
    id: string;
    name: string;
    email: string;
    plan: UserPlans;
};
