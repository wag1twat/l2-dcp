import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/server/database/database.module';
import { DayEntityUpdateListener } from './listeners/day-entity-update.listener';
import { DaysController } from './days.controller';
import { DaysService } from './days.service';

@Module({
  imports: [DatabaseModule],
  controllers: [DaysController],
  providers: [DaysService, DayEntityUpdateListener],
})
export class DaysModule {}
