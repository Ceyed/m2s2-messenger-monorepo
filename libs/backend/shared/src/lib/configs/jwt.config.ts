import { IsNotEmpty, IsString } from 'class-validator';
import { registerConfig } from '../utils';

export enum JWT_CONFIG {
  JWT_ACCESS_TOKEN_SECRET = 'JWT_ACCESS_TOKEN_SECRET',
  JWT_ACCESS_TOKEN_EXPIRATION_TIME = 'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
}

export class JwtConfig {
  @IsString()
  @IsNotEmpty()
  secret: string;

  @IsString()
  @IsNotEmpty()
  expirationTime: string;

  constructor(obj: Partial<JwtConfig>) {
    Object.assign(this, obj);
  }
}

export const jwtConfig = registerConfig(JwtConfig, () => {
  return new JwtConfig({
    secret: process.env[JWT_CONFIG.JWT_ACCESS_TOKEN_SECRET],
    expirationTime: process.env[JWT_CONFIG.JWT_ACCESS_TOKEN_EXPIRATION_TIME],
  });
});
