import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  getHello() {
    return this.appService.getHello();
  }

  @Get('/')
  @Render('Index')
  home() {
    return {};
  }
}
