import { ConsoleLogger } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

export class LoggerService extends ConsoleLogger {
    constructor(context: string) {
        const logLevels = process.env.LOG_LEVEL?.split(',') as Array<
            'log' | 'error' | 'warn' | 'debug' | 'verbose'
        >;

        super(context, {
            logLevels,
        });
    }
}
