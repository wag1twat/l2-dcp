import {
  Controller,
  Get,
  Query,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigInterceptor, ParamsInterceptor } from './interceptors';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Render('Index')
  @Get('/days')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  index(@Query('from') from: string, @Query('to') to: string) {
    return this.appService.days(from, to);
  }
}
