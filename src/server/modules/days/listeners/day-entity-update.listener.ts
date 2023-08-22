import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { dataSource } from 'src/server/database/datasource';
import { DayEntity } from '../entities/day.entity';
import {
  dayEntityUpdateEvent,
  DayEntityUpdateEvent,
} from '../events/day-entity-update.event';
import { UserDayEntity } from '../../users/entities/user-day.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Injectable()
export class DayEntityUpdateListener {
  async recalculateUser(day: DayEntity | null) {
    if (day) {
      const users: Record<
        UserEntity['id'],
        Pick<UserEntity, 'points' | 'adenas'>
      > = {};

      const optionsL = day.options.length;

      for (let i = 0; i < optionsL; i++) {
        const usersL = day.options[i].users.length;

        const adenas =
          day.options[i].count * day.options[i].option.cost_in_adenas;
        const points =
          day.options[i].count * day.options[i].option.cost_in_points;

        for (let j = 0; j < usersL; j++) {
          Object.assign(users, {
            [day.options[i].users[j].id]: {
              adenas: (users[day.options[i].users[j].id]?.adenas || 0) + adenas,
              points: (users[day.options[i].users[j].id]?.points || 0) + points,
            },
          });
        }
      }

      for (let id in users) {
        const exist = await dataSource.getRepository(UserDayEntity).findOne({
          where: {
            user: { id },
            day: { id: day.id },
          },
          relations: { day: true, user: true },
        });

        const rel = await dataSource.getRepository(UserDayEntity).save(
          Object.assign(exist || { user: { id }, day: { id: day.id } }, {
            adenas: users[id].adenas,
            points: users[id].points,
          }),
        );

        await dataSource
          .getRepository(UserEntity)
          .createQueryBuilder()
          .relation('days')
          .of(rel.user.id)
          .addAndRemove(rel.id, rel.id);

        const user = await dataSource
          .getRepository(UserEntity)
          .createQueryBuilder('users')
          .where({ id })
          .leftJoin('users.days', 'days')
          .leftJoin('days.day', 'day')
          .addSelect('SUM(days.points) :: float', 'users_points')
          .addSelect('SUM(days.adenas) :: float', 'users_adenas')
          .groupBy('users.id')
          .getOne();

        if (user !== null) {
          await dataSource.getRepository(UserEntity).save(user);
        }
      }
    }
  }
  async recalculateDay(day: DayEntity | null) {
    if (day) {
      const l = day.options.length;
      let adenas = 0;
      let points = 0;
      for (let i = 0; i < l; i++) {
        adenas =
          adenas + day.options[i].count * day.options[i].option.cost_in_adenas;
        points =
          points + day.options[i].count * day.options[i].option.cost_in_points;
      }

      await dataSource
        .getRepository(DayEntity)
        .update(day.id, { adenas, points });
    }
  }

  @OnEvent(dayEntityUpdateEvent, { async: true, promisify: true })
  async dayEntityUpdateEvent(event: DayEntityUpdateEvent) {
    const day = await dataSource
      .getRepository(DayEntity)
      .createQueryBuilder('days')
      .where('days.id = :id', { id: event.payload.id })
      .leftJoin('days.options', 'options')
      .addSelect('options')
      .leftJoin('options.users', 'users')
      .addSelect('users')
      .leftJoin('options.option', 'option')
      .addSelect('option')
      .getOne();

    await this.recalculateDay(day);
    await this.recalculateUser(day);
  }
}
