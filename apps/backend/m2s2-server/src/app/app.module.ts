import { appConfig } from '@m2s2/backend/shared/configs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../modules/auth/auth.module';
import { UserModule } from '../modules/user/user.module';
import { GlobalValidationPipe } from './../../../../../libs/backend/shared/src/lib/pipes/global-validation.pipe';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'm2s2',
      // entities: [],
      // entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      // synchronize: process.env['SYNCHRONIZE'] === 'true',
    }),
    ConfigModule.forFeature(appConfig),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: GlobalValidationPipe,
    },
  ],
})
export class AppModule {}
