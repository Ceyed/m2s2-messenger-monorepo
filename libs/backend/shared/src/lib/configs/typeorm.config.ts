import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { registerConfig } from '../utils';

enum TYPEORM_CONFIG {
  TYPEORM_TYPE = 'TYPEORM_TYPE',
  TYPEORM_HOST = 'TYPEORM_HOST',
  TYPEORM_PORT = 'TYPEORM_PORT',
  TYPEORM_USERNAME = 'TYPEORM_USERNAME',
  TYPEORM_PASSWORD = 'TYPEORM_PASSWORD',
  TYPEORM_DATABASE = 'TYPEORM_DATABASE',
  TYPEORM_AUTO_LOAD = 'TYPEORM_AUTO_LOAD',
  TYPEORM_SYNCHRONIZE = 'TYPEORM_SYNCHRONIZE',
}

export class TypeormConfig {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  host: string;

  @IsNumber()
  port = 5432;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  database: string;

  @IsBoolean()
  autoLoadEntities: boolean;

  @IsBoolean()
  synchronize: boolean = false;

  constructor(obj: Partial<TypeormConfig>) {
    Object.assign(this, obj);
  }
}

export const typeormConfig = registerConfig(TypeormConfig, () => {
  const autoLoadEntities = process.env[TYPEORM_CONFIG.TYPEORM_AUTO_LOAD];
  const synchronize = process.env[TYPEORM_CONFIG.TYPEORM_SYNCHRONIZE];

  return new TypeormConfig({
    type: process.env[TYPEORM_CONFIG.TYPEORM_TYPE],
    host: process.env[TYPEORM_CONFIG.TYPEORM_HOST],
    port: process.env[TYPEORM_CONFIG.TYPEORM_PORT]
      ? +process.env[TYPEORM_CONFIG.TYPEORM_PORT]
      : undefined,
    username: process.env[TYPEORM_CONFIG.TYPEORM_USERNAME],
    password: process.env[TYPEORM_CONFIG.TYPEORM_PASSWORD],
    database: process.env[TYPEORM_CONFIG.TYPEORM_DATABASE],
    autoLoadEntities: autoLoadEntities ? autoLoadEntities.toLowerCase() === 'true' : undefined,
    synchronize: synchronize ? synchronize.toLowerCase() === 'true' : undefined,
  });
});
