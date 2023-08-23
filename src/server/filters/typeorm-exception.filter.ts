import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { pick } from 'lodash';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const lang = I18nContext.current(host)?.lang;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof EntityNotFoundError) {
      return response.status(400).json({
        status: 400,
        name: exception.name,
        message: this.i18n.t('typeorm.EntityNotFoundError', { lang }),
        query: request.query,
        body: request.body,
        driverError: null,
      });
    }

    if (exception instanceof QueryFailedError) {
      return response.status(400).json({
        status: 400,
        name: exception.name,
        message: this.i18n.t('typeorm.QueryFailedError', { lang }),
        query: request.query,
        body: request.body,
        sql: pick(exception.driverError, ['code', 'detail']),

        exception,
      });
    }

    return response.status(500).json({
      message: 'Исключение, ошибка не обработана',
      exception,
    });
  }
}
