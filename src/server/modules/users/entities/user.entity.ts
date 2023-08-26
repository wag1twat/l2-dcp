import {
  AfterInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserDayEntity } from './user-day.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt!: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt!: string;

  @Column({ type: 'varchar', unique: true })
  name!: string;

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

  @Column({ type: 'boolean', default: false })
  deleted!: boolean;

  @ManyToMany(() => UserDayEntity, (entity) => entity.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinTable()
  days!: UserDayEntity[];
}

export type ClientUserEntity = Pick<
  UserEntity,
  'id' | 'adenas' | 'points' | 'name' | 'deleted'
>;
