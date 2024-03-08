import * as path from 'path';
import { DataSourceOptions } from 'typeorm';

export const M2S2_DB_CONFIG: Pick<DataSourceOptions, 'entities' | 'migrations'> = {
  migrations: [`${path.join(__dirname, './')}migrations/*.{ts,js}`],
  entities: [`${path.join(__dirname, './')}/entities/**/*.entity.{ts,js}`],
};
