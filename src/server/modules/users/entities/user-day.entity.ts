import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DayEntity } from '../../days/entities/day.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'users_days' })
export class UserDayEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt!: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt!: string;

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

  @ManyToOne(() => UserEntity, (entity) => entity.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  user!: UserEntity;

  @ManyToOne(() => DayEntity, (entity) => entity.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  day!: DayEntity;
}
