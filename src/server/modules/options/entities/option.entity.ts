import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
    type: 'integer',
    default: 0,
  })
  cost_in_points!: number;

  @Column({
    type: 'integer',
    default: 0,
  })
  cost_in_adenas!: number;

  @Column({ type: 'boolean', default: false })
  deleted!: boolean;
}

export type ClientOptionEntity = Pick<
  OptionEntity,
  'id' | 'cost_in_adenas' | 'cost_in_points' | 'name' | 'deleted'
>;
