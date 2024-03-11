import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfig, appConfig } from 'libs/backend/shared/src/lib/configs';
import { AppModule } from './app/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // * Set a prefix to all routes
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // * Introduce appConfig
  const appConfigInstance: AppConfig = app.get(appConfig.KEY);

  // * Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('M2S2')
    .setDescription('The M2S2 API description')
    .addBearerAuth()
    .addServer(`http://${appConfigInstance.host}:${appConfigInstance.port}`)
    .addServer(`http://localhost:${appConfigInstance.port}`)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, document);

  // * Start server
  await app.listen(appConfigInstance.port);
  Logger.log(
    `🐼 Server is online at: http://${appConfigInstance.host}:${appConfigInstance.port}/${globalPrefix}`,
  );
}

bootstrap();
