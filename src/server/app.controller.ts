import { Controller, Get, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';
import querystring from 'node:querystring';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  redirect(@Res() res: Response) {
    const { from, to } = this.appService.getDaysDefaultQueries();

    res.redirect(`/days?${querystring.stringify({ from, to })}`);
  }
}
