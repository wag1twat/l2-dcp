import { Module } from '@nestjs/common';
import { OptionsService } from 'src/server/modules/options';
import { DatabaseModule } from 'src/server/database/database.module';
import { QueriesService } from '../../queries/queries.service';
import { UsersService } from '../../users/users.service';
import { DaysService } from '../days.service';
import { RenderController } from './render.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [RenderController],
  providers: [DaysService, UsersService, OptionsService, QueriesService],
})
export class RenderModule {}
