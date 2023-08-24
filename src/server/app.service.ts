import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { DaysService } from './modules/days/days.service';

@Injectable()
export class AppService {
  constructor() {}

  getDaysDefaultQueries() {
    const now = DateTime.now();
    const from = now.startOf('month').toISO();
    const to = now.endOf('month').toISO();
    return { from, to };
  }
}
