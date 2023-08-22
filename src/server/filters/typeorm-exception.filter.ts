import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError, TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof EntityNotFoundError) {
      return response.status(400).json({
        status: 400,
        name: exception.name,
        message: 'Объект не найден в базе данных',
        response: request.query,
      });
    }

    return response.status(500).json({
      message: 'Исключение, ошибка не обработана',
      exception,
    });
  }
}
