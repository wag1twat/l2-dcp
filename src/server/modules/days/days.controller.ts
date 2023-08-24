import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { classToPlain, instanceToPlain } from 'class-transformer';
import { I18nValidationExceptionFilter } from 'nestjs-i18n';
import { TypeOrmExceptionFilter } from 'src/server/filters';
import { TransformResponseInterceptor } from 'src/server/interceptors';
import { DaysService } from './days.service';
import { PatchDayDto, PostDayDto } from './dto/day.dto';

@Controller('api/days')
@UseInterceptors(TransformResponseInterceptor)
@UseFilters(new I18nValidationExceptionFilter(), TypeOrmExceptionFilter)
export class DaysController {
  constructor(private daysService: DaysService) {}
  @Get()
  async get(@Query('from') from: string, @Query('to') to: string) {
    return await this.daysService.get(from, to);
  }

  @Post()
  async post(@Body() dto: PostDayDto) {
    return await this.daysService.post(dto);
  }

  @Patch()
  async patch(@Query('id') id: string, @Body() dto: PatchDayDto) {
    return await this.daysService.patch(id, dto);
  }
}
