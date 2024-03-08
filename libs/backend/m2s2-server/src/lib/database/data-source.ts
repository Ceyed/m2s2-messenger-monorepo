import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { M2S2_DB_CONFIG } from './m2s2-database-config';

export const M2S2DataSource = new DataSource({
  type: 'postgres',
  schema: 'public',
  synchronize: false,
  host: process.env['TYPEORM_HOST'],
  port: process.env['TYPEORM_PORT'] ? +process.env['TYPEORM_PORT'] : 5432,
  username: process.env['TYPEORM_USERNAME'],
  password: process.env['TYPEORM_PASSWORD'],
  database: process.env['TYPEORM_DATABASE'],
  migrations: M2S2_DB_CONFIG.migrations,
  entities: M2S2_DB_CONFIG.entities,
  migrationsTableName: 'migrations',
});
