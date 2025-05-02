import * as bcrypt from 'bcryptjs';
import { HashingClientServiceContract } from '../contracts/hashing-client-service.contract';

export class BcryptService implements HashingClientServiceContract {
    public async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt);
    }

    public async compare(
        password: string,
        passwordHash: string,
    ): Promise<boolean> {
        return bcrypt.compare(password, passwordHash);
    }
}
