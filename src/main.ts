import { NestFactory } from '@nestjs/core';
import { CoreModule } from './core/core.module';
import * as dotenv from 'dotenv';

async function bootstrap(): Promise<void> {
    dotenv.config();
    const app = await NestFactory.create(CoreModule);

    app.enableCors({
        origin: ['http://127.0.0.1:5500', 'https://payment-client.vercel.app'],
        credentials: true,
    });

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
