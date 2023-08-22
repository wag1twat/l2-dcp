import { HttpException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ExceptionFactoryType } from '../../shared/exception-factory.types';

const merge = (errors: ValidationError[]): ExceptionFactoryType => {
  return errors.reduce<ExceptionFactoryType>(
    (acc, { property, constraints = {}, children }) => {
      const messages = Object.values(constraints);

      if (children) {
        return {
          ...acc,
          [property]: {
            message: messages.at(-1),
            ...merge(children),
          },
        };
      }
      return {
        ...acc,
        [property]: { message: messages.at(-1) },
      };
    },
    {} as ExceptionFactoryType,
  );
};

export const exceptionFactory = (errors: ValidationError[]) =>
  new HttpException(merge(errors), 400);
