import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/server/database/database.module';
import { QueriesService } from '../../queries/queries.service';
import { DaysService } from '../days.service';
import { RenderController } from './render.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [RenderController],
  providers: [DaysService, QueriesService],
})
export class RenderModule {}
