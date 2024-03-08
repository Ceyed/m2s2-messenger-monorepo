import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum APP_CONFIG {
  HOST = 'HOST',
  PORT = 'PORT',
  CLIENT_HOST = 'CLIENT_HOST',
  NODE_ENV = 'NODE_ENV',
}

export class AppConfig {
  @IsString()
  @IsNotEmpty()
  host: string;

  @IsNumber()
  port: number;

  @IsString()
  @IsNotEmpty()
  clientHost: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['development', 'production', 'test'])
  nodeEnv: string;

  constructor(obj: Partial<AppConfig>) {
    // console.log(obj);

    Object.assign(this, obj);
  }
}

export const appConfig = new AppConfig({
  host: process.env[APP_CONFIG.HOST],
  port: process.env[APP_CONFIG.PORT] ? +process.env[APP_CONFIG.PORT] : 3000,
  clientHost: process.env[APP_CONFIG.CLIENT_HOST],
  nodeEnv: process.env[APP_CONFIG.NODE_ENV] || 'development',
});

// console.log(appConfig);
