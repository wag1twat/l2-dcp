import { OptionEntity } from 'src/server/entities/option.entity';
import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '../database/database.provider';

export const createRepositoryProvider =
  (provide: string, entity: typeof OptionEntity) => () => ({
    provide,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
    inject: [DATA_SOURCE],
  });
