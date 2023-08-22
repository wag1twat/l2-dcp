import { Injectable } from '@nestjs/common';
import { DaysService } from './modules/days/days.service';

@Injectable()
export class AppService {
  constructor(private daysService: DaysService) {}

  days(from: string, to: string) {
    return this.daysService.get(from, to);
  }
}
