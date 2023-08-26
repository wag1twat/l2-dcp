import {
  Controller,
  Get,
  Query,
  Render,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import querystring from 'node:querystring';
import type { Response } from 'express';
import { ConfigInterceptor, ParamsInterceptor } from 'src/server/interceptors';
import { DaysService } from '../days.service';
import { RenderQueriesDto, defaultQueries } from './render-queries.dto';
import type { RenderQueriesType } from './render-queries.dto';
import { QueriesError, QueriesService } from '../../queries/queries.service';
import { ConfigService } from '@nestjs/config';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/i18n/i18n.generated';
import { PagesEnum, PagesPathname } from 'src/shared/constants/pages';
import { OptionsService } from '../../options';
import { UsersService } from '../../users/users.service';

@Controller(PagesPathname.DaysPage)
export class RenderController {
  constructor(
    private readonly daysService: DaysService,
    private readonly optionsService: OptionsService,
    private readonly usersService: UsersService,
    private readonly queriesService: QueriesService,
    private readonly configService: ConfigService,
  ) {}

  @Render(PagesEnum.DaysPage)
  @Get()
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  async days(
    @I18n() i18n: I18nContext,
    @Query() queries: RenderQueriesType,
    @Res() res: Response,
  ) {
    const translations = i18n.t('client') as I18nTranslations['client'];

    try {
      const result = await this.queriesService.validate(
        RenderQueriesDto,
        queries,
        defaultQueries(this.configService.getOrThrow('FALLBACK_LANGUAGE')),
      );

      const days = await this.daysService.get(
        result.from,
        result.to,
        result.orderBy,
        result.order,
      );

      const users = await this.usersService.get();

      const options = await this.optionsService.get();

      return {
        /* fucking hack for next.js > ctx.query */
        days: JSON.parse(JSON.stringify(days)),
        options: JSON.parse(JSON.stringify(options)),
        users: JSON.parse(JSON.stringify(users)),
        translations: translations[PagesEnum.DaysPage],
      };
    } catch (error) {
      if (error instanceof QueriesError) {
        return res.redirect(
          `/${PagesPathname.DaysPage}?${querystring.stringify({
            from: error.result.from,
            to: error.result.to,
            orderBy: error.result.orderBy,
            order: error.result.order,
            lang: error.result.lang,
          })}`,
        );
      }
      throw error;
    }
  }
}
