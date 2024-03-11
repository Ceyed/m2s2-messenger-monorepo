import { AuthGuard } from '@m2s2/backend/shared/guards';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { JwtConfig, jwtConfig } from 'libs/backend/shared/src/lib/configs';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (jwtConfig: JwtConfig): JwtModuleOptions => {
        return {
          secret: jwtConfig.secret,
          signOptions: {
            expiresIn: jwtConfig.expirationTime,
          },
        };
      },
      inject: [jwtConfig.KEY],
      imports: [ConfigModule.forFeature(jwtConfig)],
    }),
    ConfigModule.forFeature(jwtConfig),
    UserModule,
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
