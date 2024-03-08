import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppConfig, appConfig } from './../../../../libs/backend/shared/src/lib/config/app.config';
import { AppModule } from './app/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // @todo @ceyed ask
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const appConfigInstance: AppConfig = app.get(appConfig.KEY);

  await app.listen(appConfigInstance.port);
  Logger.log(
    `🐼 Application is running on: http://${appConfigInstance.host}:${appConfigInstance.port}/${globalPrefix}`,
  );
}

bootstrap();
