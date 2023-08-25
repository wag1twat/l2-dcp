import {
  Controller,
  Get,
  Query,
  Render,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { I18n, I18nContext } from 'nestjs-i18n';
import querystring from 'node:querystring';
import { I18nTranslations } from 'src/i18n/i18n.generated';
import { ConfigInterceptor, ParamsInterceptor } from 'src/server/interceptors';
import { QueriesError, QueriesService } from '../../queries/queries.service';
import { OptionsService } from '../options.service';
import {
  defaultQueries,
  RenderQueriesDto,
  RenderQueriesType,
} from './render-queries.dto';

export const renderController = 'options';

@Controller(renderController)
export class RenderController {
  constructor(
    private readonly optionsService: OptionsService,
    private readonly queriesService: QueriesService,
    private readonly configService: ConfigService,
  ) {}

  @Render('OptionsPage')
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
        translations: translations.options,
      };
    } catch (error) {
      if (error instanceof QueriesError) {
        return res.redirect(
          `/${renderController}?${querystring.stringify({
            lang: error.result.lang,
          })}`,
        );
      }
      throw error;
    }
  }
}
