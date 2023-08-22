import { Injectable } from '@nestjs/common';
import { createRepositoryProvider } from 'src/server/utils';
import { DataSource, Repository } from 'typeorm';
import { DayOptionEntity } from '../entities/day-option.entity';
import { DayEntity } from '../entities/day.entity';

@Injectable()
export class DaysRepository extends Repository<DayEntity> {
  constructor(private dataSource: DataSource) {
    super(DayEntity, dataSource.createEntityManager());
  }
}

export const daysRepositoryProvider = createRepositoryProvider(DayEntity);

@Injectable()
export class DaysOptionsRepository extends Repository<DayOptionEntity> {
  constructor(private dataSource: DataSource) {
    super(DayOptionEntity, dataSource.createEntityManager());
  }
}

export const daysOptionsRepositoryProvider =
  createRepositoryProvider(DayOptionEntity);
