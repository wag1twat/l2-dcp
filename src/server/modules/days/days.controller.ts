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
import { I18nValidationExceptionFilter } from 'nestjs-i18n';
import { TypeOrmExceptionFilter } from 'src/server/filters';
import { TransformResponseInterceptor } from 'src/server/interceptors';
import type { Order } from 'src/shared/types/queries';
import { DaysService } from './days.service';
import { PatchDayDto, PostDayDto } from './dto/day.dto';
import { GetQueriesDto } from './queries';

@Controller('api/days')
@UseInterceptors(TransformResponseInterceptor)
@UseFilters(new I18nValidationExceptionFilter(), TypeOrmExceptionFilter)
export class DaysController {
  constructor(private daysService: DaysService) {}
  @Get()
  async get(@Query() queries: GetQueriesDto) {
    const { from, to, orderBy, order } = queries;
    return await this.daysService.get(from, to, orderBy, order);
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
