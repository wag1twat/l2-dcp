import {
  Controller,
  Get,
  Query,
  Render,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import querystring from 'node:querystring';
import { Response } from 'express';
import { ConfigInterceptor, ParamsInterceptor } from 'src/server/interceptors';
import { DaysService } from '../days.service';
import {
  RenderQueriesType,
  RenderQueriesDto,
  defaultQueries,
} from './render-queries.dto';
import { QueriesError, QueriesService } from '../../queries/queries.service';
import { ConfigService } from '@nestjs/config';

export const renderController = 'days';

@Controller(renderController)
export class RenderController {
  constructor(
    private readonly daysService: DaysService,
    private readonly queriesService: QueriesService,
    private readonly configService: ConfigService,
  ) {}

  @Render('Index')
  @Get()
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  async index(@Query() queries: RenderQueriesType, @Res() res: Response) {
    try {
      const result = await this.queriesService.validate(
        RenderQueriesDto,
        queries,
        defaultQueries(this.configService.getOrThrow('FALLBACK_LANGUAGE')),
      );

      const data = await this.daysService.get(
        result.from,
        result.to,
        result.orderBy,
        result.order,
      );
      return {
        /* fucking hack for next.js > ctx.query */
        days: JSON.parse(JSON.stringify(data)),
      };
    } catch (error) {
      if (error instanceof QueriesError) {
        return res.redirect(
          `/${renderController}?${querystring.stringify({
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
