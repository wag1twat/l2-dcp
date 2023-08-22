import { NestApplication, NestFactory } from '@nestjs/core';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import morgan from 'morgan';
import {
  exceptionFactory,
  HttpExceptionFilter,
  TypeOrmExceptionFilter,
} from './filters';
import { TransformResponseInterceptor } from './interceptors';
import { PORT } from 'src/shared/constants/env';
import { RenderService } from 'nest-next';
import { I18nValidationPipe } from 'nestjs-i18n';

declare const module: any;

async function bootstrap() {
  const server = await NestFactory.create<NestApplication>(
    AppModule.initialize(),
    { logger: ['error', 'warn', 'log'] },
  );

  const service = server.get(RenderService);

  service.setErrorHandler(async (err, req, res) => {
    res.send(err.response);
  });

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

  await server.listen(PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
  }
}

bootstrap();
