import { NestFactory } from '@nestjs/core';
import { CoreModule } from './core/core.module';
import * as dotenv from 'dotenv';

async function bootstrap(): Promise<void> {
    dotenv.config();
    const app = await NestFactory.create(CoreModule);

    app.enableCors({
        origin: [process.env.URL_FRONTEND],
        credentials: true,
    });

    await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
