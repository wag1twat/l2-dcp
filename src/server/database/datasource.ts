import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { DayOptionEntity } from '../modules/days/entities/day-option.entity';
import { DayEntity } from '../modules/days/entities/day.entity';
import { OptionEntity } from '../modules/options/entities/option.entity';
import { UserDayEntity } from '../modules/users/entities/user-day.entity';
import { UserEntity } from '../modules/users/entities/user.entity';
import { Migration1692879883339 } from '../migrations/development/1692879883339-migration';

config();

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DEV_DATABASE_URL,
  synchronize: false,
  migrationsRun: false,
  logging: true,
  logger: 'file',
  entities: [
    OptionEntity,
    DayOptionEntity,
    DayEntity,
    UserEntity,
    UserDayEntity,
  ],
  migrations: [Migration1692879883339],
  dropSchema: false,
});
