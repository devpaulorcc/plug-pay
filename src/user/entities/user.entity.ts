export enum UserPlans {
    FREE = 'free',
    PRO = 'pro',
}

export class UserEntity {
    public name: string;
    public email: string;
    public password: string;
    public plan: UserPlans;
}
