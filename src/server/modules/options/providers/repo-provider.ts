import { Injectable } from '@nestjs/common';
import { createRepositoryProvider } from 'src/server/utils';
import { DataSource, Repository } from 'typeorm';
import { OptionEntity } from '../entities/option.entity';

@Injectable()
export class OptionsRepository extends Repository<OptionEntity> {
  constructor(private dataSource: DataSource) {
    super(OptionEntity, dataSource.createEntityManager());
  }
}

export const optionsRepositoryProvider = createRepositoryProvider(OptionEntity);
