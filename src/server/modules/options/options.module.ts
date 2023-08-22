import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/server/database/database.module';
import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';
import { optionsRepositoryProvider } from './providers/repo-provider';

@Module({
  imports: [DatabaseModule],
  controllers: [OptionsController],
  providers: [optionsRepositoryProvider(), OptionsService],
})
export class OptionsModule {}
