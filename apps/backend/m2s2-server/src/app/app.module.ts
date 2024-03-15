import { appConfig, typeormConfig } from '@m2s2/backend/shared/configs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
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
    ConfigModule.forFeature(appConfig),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(typeormConfig)],
      useFactory: (typeormConfigService: ConfigType<typeof typeormConfig>) =>
        ({
          schema: 'public',
          logging: 'all',
          migrationsTableName: 'migrations',

          type: typeormConfigService.type,
          host: typeormConfigService.host,
          port: typeormConfigService.port,
          username: typeormConfigService.username,
          password: typeormConfigService.password,
          database: typeormConfigService.database,
          autoLoadEntities: typeormConfigService.autoLoadEntities,
          synchronize: typeormConfigService.synchronize,
        } as DataSourceOptions),
      inject: [typeormConfig.KEY],
    }),

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
