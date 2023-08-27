import { Module } from '@nestjs/common';
import { OptionsService } from 'src/server/modules/options';
import { DatabaseModule } from 'src/server/database/database.module';
import { UsersService } from '../../users/users.service';
import { RenderController } from './render.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [RenderController],
  providers: [UsersService, OptionsService],
})
export class RenderModule {}
