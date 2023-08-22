import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '../database/database.provider';
import { DayOptionEntity } from '../modules/days/entities/day-option.entity';
import { DayEntity } from '../modules/days/entities/day.entity';
import { OptionEntity } from '../modules/options/entities/option.entity';
import { UserEntity } from '../modules/users/entities/user.entity';

export const createRepositoryProvider =
  (
    entity:
      | typeof OptionEntity
      | typeof DayEntity
      | typeof UserEntity
      | typeof DayOptionEntity,
  ) =>
  () => ({
    provide: entity.name,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
    inject: [DATA_SOURCE],
  });
