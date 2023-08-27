import {
  Controller,
  Get,
  Query,
  Render,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import type { Response } from 'express';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/i18n/i18n.generated';
import {
  PagesEnum,
  pagesPathname,
  PagesPathname,
} from 'src/shared/constants/pages';
import { ConfigInterceptor, ParamsInterceptor } from 'src/server/interceptors';
import { OptionsService } from '../options.service';
import { Lang } from 'src/shared/types/queries';

@Controller(PagesPathname.OptionsPage)
export class RenderController {
  constructor(private readonly optionsService: OptionsService) {}

  @Render(PagesEnum.OptionsPage)
  @Get()
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  async options(
    @Query('lang') lang: Lang,
    @I18n() i18n: I18nContext,
    @Res() res: Response,
  ) {
    if (!lang) {
      return res.redirect(
        `${pagesPathname(PagesEnum.OptionsPage)}?lang=${i18n.lang}`,
      );
    }

    const translations = i18n.t('client') as I18nTranslations['client'];

    const options = await this.optionsService.get();
    return {
      /* fucking hack for next.js > ctx.query */
      options: JSON.parse(JSON.stringify(options)),
      translations: translations[PagesEnum.OptionsPage],
    };
  }
}
