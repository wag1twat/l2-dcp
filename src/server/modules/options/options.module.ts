import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/server/database/database.module';
import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OptionsController],
  providers: [OptionsService],
})
export class OptionsModule {}
