import {
  Controller,
  Get,
  Query,
  Render,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigInterceptor, ParamsInterceptor } from 'src/server/interceptors';
import { DaysService } from '../days.service';

@Controller()
export class DaysRenderController {
  constructor(private readonly daysService: DaysService) {}

  @Render('Index')
  @Get('/days')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  async index(
    @Query('from') from: string,
    @Query('to') to: string,
    @Res() res: Response,
  ) {
    return {
      /* fucking hack for next.js > ctx.query */
      days: JSON.parse(JSON.stringify(await this.daysService.get(from, to))),
    };
  }
}
