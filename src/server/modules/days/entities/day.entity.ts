import { UserEntity } from 'dist/server/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DayOptionEntity } from './day-option.entity';

@Entity({ name: 'days' })
export class DayEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt!: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt!: string;

  @Column({ type: 'timestamp without time zone', unique: true })
  date!: string;

  @Column({
    type: 'integer',
    default: 0,
  })
  points!: number;

  @Column({
    type: 'integer',
    default: 0,
  })
  adenas!: number;

  @ManyToMany(() => DayOptionEntity, (entity) => entity.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinTable()
  options!: DayOptionEntity[];
}

export type ClientDayEntity = Pick<
  DayEntity,
  'id' | 'date' | 'adenas' | 'points'
> & {
  options_count: number;
  users_count: number;
  options: Pick<DayOptionEntity, 'id' | 'count'> & {
    users: UserEntity['id'];
  };
};
