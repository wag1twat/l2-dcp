import { OptionEntity } from 'src/server/entities/option.entity';
import { DataSource } from 'typeorm';

export const optionsProviders = [
  {
    provide: 'OPTIONS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(OptionEntity),
    inject: ['DATA_SOURCE'],
  },
];
