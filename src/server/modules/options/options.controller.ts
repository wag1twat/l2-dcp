import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { TransformResponseInterceptor } from 'src/server/interceptors';
import { OptionsService } from './options.service';

@Controller('options')
export class OptionsController {
  constructor(private optionsService: OptionsService) {}
  @Get()
  @UseInterceptors(TransformResponseInterceptor)
  async get() {
    return this.optionsService.get();
  }
}
