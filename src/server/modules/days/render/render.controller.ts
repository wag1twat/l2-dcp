import {
  Controller,
  Get,
  Query,
  Render,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigInterceptor, ParamsInterceptor } from 'src/server/interceptors';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/i18n/i18n.generated';
import {
  PagesEnum,
  pagesPathname,
  PagesPathname,
} from 'src/shared/constants/pages';
import { OptionsService } from '../../options';
import { UsersService } from '../../users/users.service';
import { Lang } from 'src/shared/types/queries';
import { Response } from 'express';
import { DaysRenderResult } from './render-result';

@Controller(PagesPathname.DaysPage)
export class RenderController {
  constructor(
    private readonly optionsService: OptionsService,
    private readonly usersService: UsersService,
  ) {}

  @Render(PagesEnum.DaysPage)
  @Get()
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  async days(
    @Query('lang') lang: Lang,
    @Res() res: Response,
    @I18n() i18n: I18nContext,
  ) {
    if (!lang) {
      return res.redirect(
        `${pagesPathname(PagesEnum.DaysPage)}?lang=${i18n.lang}`,
      );
    }

    const translations = i18n.t('client') as I18nTranslations['client'];

    const users = await this.usersService.get();

    const options = await this.optionsService.get();

    return {
      /* fucking hack for next.js > ctx.query */
      options: JSON.parse(JSON.stringify(options)),
      users: JSON.parse(JSON.stringify(users)),
      translations: translations[PagesEnum.DaysPage],
    };
  }
}
