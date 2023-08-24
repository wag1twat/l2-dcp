import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/server/database/database.module';
import { DayEntityUpdateListener } from './listeners/day-entity-update.listener';
import { DaysController } from './days.controller';
import { DaysService } from './days.service';
import { DaysRenderController } from './render/days-render.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [DaysController, DaysRenderController],
  providers: [DaysService, DayEntityUpdateListener],
})
export class DaysModule {}
