import { Controller, Get, Render, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import querystring from 'node:querystring';
import { AppService } from './app.service';
import { defaultQueries as defaultDaysRenderQueries } from './modules/days/render/render-queries.dto';
import { renderController as daysRenderController } from './modules/days/render/render.controller';

export const pageNotFoundPath = '/page-not-found';
export const serverSideErrorOccuredPath = '/server-side-error-occurred';
@Controller()
export class AppController {
  constructor(
    private readonly configService: ConfigService,
    private readonly appService: AppService,
  ) {}

  @Get(pageNotFoundPath)
  @Render('404')
  notFound() {}

  @Get(serverSideErrorOccuredPath)
  @Render('500')
  internal() {}

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
