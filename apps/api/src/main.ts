import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';

import { AppModule } from './app/app.module';

config();

const GLOBAL_PREFIX = 'api';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(GLOBAL_PREFIX);

    setupSwagger(app);
    await runApplication(app);
}

function setupSwagger(app: INestApplication): void {
    const config = new DocumentBuilder().setTitle('Tracelytics events API').setVersion('1.0').build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup(GLOBAL_PREFIX, app, document);
}

async function runApplication(app: INestApplication): Promise<void> {
    const port = process.env.PORT || 3000;

    await app.listen(port);
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`);
}

bootstrap();
