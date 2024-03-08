import { appConfig } from './../../../../libs/backend/shared/src/lib/config/app.config';
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // @todo @ceyed ask
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  await app.listen(appConfig.port);
  Logger.log(
    `🐼 Application is running on: http://${appConfig.host}:${appConfig.port}/${globalPrefix}`,
  );
}

bootstrap();
