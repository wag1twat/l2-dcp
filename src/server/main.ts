import { NestApplication, NestFactory } from '@nestjs/core';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import morgan from 'morgan';

declare const module: any;

async function bootstrap() {
  const server = await NestFactory.create<NestApplication>(
    AppModule.initialize(),
    { logger: ['error', 'warn', 'log'] },
  );

  server.use(bodyParser.json());

  server.use(bodyParser.urlencoded({ extended: true }));

  server.use(morgan('tiny'));

  server.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipNullProperties: false,
      skipUndefinedProperties: false,
    }),
  );

  server.enableCors();

  await server.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
  }
}

bootstrap();
