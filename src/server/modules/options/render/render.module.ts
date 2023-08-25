import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/server/database/database.module';
import { QueriesService } from '../../queries/queries.service';
import { OptionsService } from '../options.service';
import { RenderController } from './render.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [RenderController],
  providers: [OptionsService, QueriesService],
})
export class RenderModule {}
