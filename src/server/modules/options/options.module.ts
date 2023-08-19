import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/server/database/database.module';
import { optionsRepositoryProvider } from '../../entities/option.entity';
import { OptionsController } from './options.controller';
import { optionsProviders } from './options.provider';
import { OptionsService } from './options.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OptionsController],
  providers: [optionsRepositoryProvider(), OptionsService],
})
export class OptionsModule {}
