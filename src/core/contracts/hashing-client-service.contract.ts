export abstract class HashingClientServiceContract {
    public abstract hash(password: string): Promise<string>;

    public abstract compare(
        password: string,
        passwordHash: string,
    ): Promise<boolean>;
}
