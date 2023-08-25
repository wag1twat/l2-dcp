import { NestApplication, NestFactory } from '@nestjs/core';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { PORT } from 'src/shared/constants/env';
import { RenderService } from 'nest-next';
import { I18nValidationPipe } from 'nestjs-i18n';
import { Response } from 'express';
import { pageNotFoundPath, serverSideErrorOccuredPath } from './app.controller';

declare const module: any;

async function bootstrap() {
  const server = await NestFactory.create<NestApplication>(
    AppModule.initialize(),
    { logger: ['error', 'warn', 'log'] },
  );

  server.use(bodyParser.json());

  server.use(bodyParser.urlencoded({ extended: true }));

  server.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      skipNullProperties: false,
      skipUndefinedProperties: false,
    }),
  );

  server.enableCors();

  const service = server.get(RenderService);

  service.setErrorHandler(async (err, req, res: Response) => {
    // if (res.statusCode === 404) {
    //   return res.redirect(pageNotFoundPath);
    // }
    // if (res.statusCode === 500) {
    //   return res.redirect(serverSideErrorOccuredPath);
    // }
    return res.send(err.response);
  });

  await server.listen(PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
  }
}

bootstrap();
