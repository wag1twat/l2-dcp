import { DayEntity } from '../entities/day.entity';

export const dayEntityUpdateEvent = 'day-entity.update';

export class DayEntityUpdateEvent {
  payload!: Pick<DayEntity, 'id'>;
}
