import { Controller, Get, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import querystring from 'node:querystring';
import { AppService } from './app.service';
import { defaultQueries as defaultDaysRenderQueries } from './modules/days/render/render-queries.dto';
import { renderController as daysRenderController } from './modules/days/render/render.controller';

@Controller()
export class AppController {
  constructor(
    private readonly configService: ConfigService,
    private readonly appService: AppService,
  ) {}

  @Get()
  redirect(@Res() res: Response) {
    const queries = defaultDaysRenderQueries(
      this.configService.getOrThrow('FALLBACK_LANGUAGE'),
    );
    res.redirect(
      `/${daysRenderController}?${querystring.stringify({
        from: queries.from,
        to: queries.to,
        orderBy: queries.orderBy,
        order: queries.order,
        lang: queries.lang,
      })}`,
    );
  }
}
