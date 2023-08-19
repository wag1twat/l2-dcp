import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { OptionEntity } from '../entities/option.entity';
import { Migration1692480264014 } from '../migrations/development/1692480264014-migration';

config();

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DEV_DATABASE_URL,
  synchronize: false,
  migrationsRun: false,
  logging: true,
  logger: 'file',
  entities: [OptionEntity],
  migrations: [Migration1692480264014],
  dropSchema: false,
});
