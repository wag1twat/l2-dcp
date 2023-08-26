import { Inject, Injectable } from '@nestjs/common';
import { DATA_SOURCE } from 'src/server/database/database.provider';
import { entitiesId, entityId } from 'src/server/utils';
import { Between, DataSource } from 'typeorm';
import { PatchDayDto, PostDayDto } from './dto/day.dto';
import { DayOptionEntity } from './entities/day-option.entity';
import { ClientDayEntity, DayEntity } from './entities/day.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  dayEntityUpdateEvent,
  DayEntityUpdateEvent,
} from './events/day-entity-update.event';
import { DateManager } from 'src/shared/utils/date-manager';
import { Order } from 'src/shared/types/queries';

@Injectable()
export class DaysService {
  constructor(
    @Inject(DATA_SOURCE)
    private dataSource: DataSource,
    private eventEmitter: EventEmitter2,
  ) {}

  async get(
    from: string,
    to: string,
    orderBy: string,
    order: Order,
  ): Promise<ClientDayEntity[]> {
    return (await this.dataSource
      .getRepository(DayEntity)
      .createQueryBuilder('days')
      .select(['days.id', 'days.date', 'days.points', 'days.adenas'])
      .loadRelationCountAndMap('days.options_count', 'days.options')
      .loadRelationCountAndMap('days.users_count', 'days.options.users')
      .leftJoin('days.options', 'options')
      .addSelect(['options.id', 'options.count'])
      .loadRelationIdAndMap('users', 'options.users')
      .where({ date: Between(from, to) })
      .orderBy(`days.${orderBy}`, order)
      .getMany()) as unknown as ClientDayEntity[];
  }

  async post(dto: PostDayDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const date = DateManager.ISO_DATE(dto.date);

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
      const date = DateManager.ISO_DATE(dto.date);

      let options: DayOptionEntity[] = [];

      const l = dto.options.length;
      for (let i = 0; i < l; i++) {
        let option = await queryRunner.manager.findOne(DayOptionEntity, {
          where: { day: entityId(id), option: entityId(dto.options[i].id) },
        });

        if (option == null) {
          option = queryRunner.manager.create(DayOptionEntity);
        }

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
