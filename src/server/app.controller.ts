import { Controller, Get, Query, Render, Res } from '@nestjs/common';
import type { Response } from 'express';
import { I18n, I18nContext } from 'nestjs-i18n';
import { PagesEnum, pagesPathname } from 'src/shared/constants/pages';
import { Lang } from 'src/shared/types/queries';
import { AppService } from './app.service';

export const pageNotFoundPath = '/page-not-found';
export const serverSideErrorOccuredPath = '/server-side-error-occurred';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(pageNotFoundPath)
  @Render('404')
  notFound() {}

  @Get(serverSideErrorOccuredPath)
  @Render('500')
  internal() {}

  @Get()
  redirect(
    @Query('lang') lang: Lang,
    @I18n() i18n: I18nContext,
    @Res() res: Response,
  ) {
    res.redirect(`${pagesPathname(PagesEnum.DaysPage)}?${lang || i18n.lang}`);
  }
}
