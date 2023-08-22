import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import {
  HttpExceptionFilter,
  TypeOrmExceptionFilter,
} from 'src/server/filters';
import { TransformResponseInterceptor } from 'src/server/interceptors';
import { PatchOptionDto, PostOptionDto } from './dto/option.dto';
import { OptionsService } from './options.service';

@Controller('api/options')
@UseInterceptors(TransformResponseInterceptor)
@UseFilters(TypeOrmExceptionFilter, HttpExceptionFilter)
export class OptionsController {
  constructor(private optionsService: OptionsService) {}
  @Get()
  async get() {
    return await this.optionsService.get();
  }

  @Post()
  async post(@Body() dto: PostOptionDto) {
    return await this.optionsService.post(dto);
  }

  @Patch()
  async patch(@Query('id') id: string, @Body() dto: PatchOptionDto) {
    return await this.optionsService.patch(id, dto);
  }

  @Delete()
  async delete(@Query('id') id: string) {
    return await this.optionsService.delete(id);
  }
}
