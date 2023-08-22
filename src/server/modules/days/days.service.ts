import { Inject, Injectable } from '@nestjs/common';
import { DATA_SOURCE } from 'src/server/database/database.provider';
import { entitiesId, entityId, ISOtoStartOfDay } from 'src/server/utils';
import { Between, DataSource } from 'typeorm';
import { PatchDayDto, PostDayDto } from './dto/day.dto';
import { DayOptionEntity } from './entities/day-option.entity';
import { DayEntity } from './entities/day.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  dayEntityUpdateEvent,
  DayEntityUpdateEvent,
} from './events/day-entity-update.event';
import { DateTime } from 'luxon';

@Injectable()
export class DaysService {
  constructor(
    @Inject(DATA_SOURCE)
    private dataSource: DataSource,
    private eventEmitter: EventEmitter2,
  ) {}

  async get(from: string, to: string) {
    return await this.dataSource
      .getRepository(DayEntity)
      .createQueryBuilder('days')
      .where({ date: Between(from, to) })
      .leftJoinAndSelect('days.options', 'options')
      .leftJoinAndSelect('options.option', 'option')
      .leftJoinAndSelect('options.users', 'users')
      .leftJoinAndSelect('options.day', 'day')
      .getMany();
  }

  async post(dto: PostDayDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const date = ISOtoStartOfDay(dto.date);

      let day = await queryRunner.manager.findOne(DayEntity, {
        where: { date },
      });

      if (day === null) {
        day = await queryRunner.manager.save(DayEntity, { date });
      }

      await queryRunner.commitTransaction();

      return await this.patch(day.id, dto);
    } catch (err) {
      await queryRunner.rollbackTransaction();

      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async patch(id: DayEntity['id'], dto: PatchDayDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const date = ISOtoStartOfDay(dto.date);

      let options: DayOptionEntity[] = [];

      const l = dto.options.length;
      for (let i = 0; i < l; i++) {
        let option = queryRunner.manager.create(DayOptionEntity);

        options.push(
          Object.assign(option, {
            option: entityId(dto.options[i].id),
            users: entitiesId(dto.options[i].users),
            count: dto.options[i].count,
            day: entityId(id),
          }),
        );
      }

      options = await queryRunner.manager.save(options);

      await queryRunner.manager.save(DayEntity, {
        id,
        date,
        options,
      });

      await queryRunner.commitTransaction();

      const event = new DayEntityUpdateEvent();
      event.payload = { id };

      await this.eventEmitter.emitAsync(dayEntityUpdateEvent, event);

      return await queryRunner.manager.findOne(DayEntity, {
        where: { id },
        relations: { options: { option: true, users: true, day: true } },
      });
    } catch (err) {
      await queryRunner.rollbackTransaction();

      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
