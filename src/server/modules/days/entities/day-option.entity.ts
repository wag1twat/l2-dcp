import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DayEntity } from './day.entity';
import { OptionEntity } from '../../options/entities/option.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity({ name: 'days_options' })
export class DayOptionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt!: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt!: string;

  @Column({ type: 'smallint', default: 0 })
  count!: number;

  @ManyToOne(() => DayEntity, (entity) => entity.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  day!: DayEntity;

  @ManyToOne(() => OptionEntity, (entity) => entity.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  option!: OptionEntity;

  @ManyToMany(() => UserEntity, (entity) => entity.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinTable()
  users!: UserEntity[];
}
