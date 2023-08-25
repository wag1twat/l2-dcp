import { Controller, Get, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';
import querystring from 'node:querystring';
import { AppService } from './app.service';
import { RenderQueriesType } from './modules/days/render/render-queries.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // redirect(@Res() res: Response) {
  //   const { from, to, order, orderBy } = new DaysRenderQueriesDto();
  //   res.redirect(
  //     `/days?${querystring.stringify({ from, to, orderBy, order })}`,
  //   );
  // }
}
