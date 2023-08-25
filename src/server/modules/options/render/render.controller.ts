import {
  Controller,
  Get,
  Query,
  Render,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import { I18n, I18nContext } from 'nestjs-i18n';
import querystring from 'node:querystring';
import { I18nTranslations } from 'src/i18n/i18n.generated';
import { PagesEnum, PagesPathname } from 'src/shared/constants/pages';
import { ConfigInterceptor, ParamsInterceptor } from 'src/server/interceptors';
import { QueriesError, QueriesService } from '../../queries/queries.service';
import { OptionsService } from '../options.service';
import { defaultQueries, RenderQueriesDto } from './render-queries.dto';
import type { RenderQueriesType } from './render-queries.dto';

@Controller(PagesPathname.OptionsPage)
export class RenderController {
  constructor(
    private readonly optionsService: OptionsService,
    private readonly queriesService: QueriesService,
    private readonly configService: ConfigService,
  ) {}

  @Render(PagesEnum.OptionsPage)
  @Get()
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  async options(
    @I18n() i18n: I18nContext,
    @Query() queries: RenderQueriesType,
    @Res() res: Response,
  ) {
    const translations = i18n.t('client') as I18nTranslations['client'];

    try {
      await this.queriesService.validate(
        RenderQueriesDto,
        queries,
        defaultQueries(this.configService.getOrThrow('FALLBACK_LANGUAGE')),
      );

      const options = await this.optionsService.get();
      return {
        /* fucking hack for next.js > ctx.query */
        options: JSON.parse(JSON.stringify(options)),
        translations: translations[PagesEnum.OptionsPage],
      };
    } catch (error) {
      if (error instanceof QueriesError) {
        return res.redirect(
          `/${PagesPathname.OptionsPage}?${querystring.stringify({
            lang: error.result.lang,
          })}`,
        );
      }
      throw error;
    }
  }
}
