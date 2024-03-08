import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { M2S2_DB_CONFIG } from './m2s2-database-config';

export const M2S2DataSource = new DataSource({
  type: 'postgres',
  schema: 'public',
  synchronize: false,
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123',
  database: 'm2s2',
  migrations: M2S2_DB_CONFIG.migrations,
  entities: M2S2_DB_CONFIG.entities,
  migrationsTableName: 'migrations',
});
