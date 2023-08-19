import { Injectable } from '@nestjs/common';
import {
  Column,
  CreateDateColumn,
  DataSource,
  Entity,
  PrimaryGeneratedColumn,
  Repository,
  UpdateDateColumn,
} from 'typeorm';
import { createRepositoryProvider } from '../utils';

@Entity({ name: 'options' })
export class OptionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt!: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt!: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  name!: string;

  @Column({
    type: 'smallint',
  })
  cost_in_points!: number;

  @Column({
    type: 'integer',
  })
  cost_in_adenas!: number;
}

@Injectable()
export class OptionsRepository extends Repository<OptionEntity> {
  constructor(private dataSource: DataSource) {
    super(OptionEntity, dataSource.createEntityManager());
  }
}

export const optionsRepositoryProvider = createRepositoryProvider(
  'OPTIONS_REPOSITORY',
  OptionEntity,
);
