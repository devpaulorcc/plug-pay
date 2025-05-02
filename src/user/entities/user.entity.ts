export enum UserPlans {
    FREE = 'free',
    PRO = 'pro',
}

export enum UserPlanStatus {
    PAID = 'PAID',
    PENDING = 'PENDING',
    FAILED = 'FAILED',
}

export class UserEntity {
    public id: string;
    public name: string;
    public email: string;
    public password: string;
    public plan: UserPlans;
    public planStatus: UserPlanStatus;
}
