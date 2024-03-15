import { IsNumber, Min } from 'class-validator';
import { registerConfig } from '../utils';

export enum BCRYPT_CONFIG {
  SALT_HASH = 'SALT_HASH',
}

export class BcryptConfig {
  @IsNumber()
  @Min(0)
  saltHash: number;

  constructor(obj: Partial<BcryptConfig>) {
    Object.assign(this, obj);
  }
}

export const bcryptConfig = registerConfig(BcryptConfig, () => {
  const saltHash = process.env[BCRYPT_CONFIG.SALT_HASH];
  return new BcryptConfig({
    saltHash: saltHash ? +saltHash : undefined,
  });
});
