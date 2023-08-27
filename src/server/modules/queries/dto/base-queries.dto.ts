import { IsEnum, IsNotEmpty, Validate } from 'class-validator';
import { i18nValidationMessage } from 'src/i18n/i18nValidationMessage';
import { IsDate, IsDateAfter, IsDateBefore } from 'src/server/utils';
import type { Lang, Order } from 'src/shared/types/queries';

export class BaseQueryFromDate {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @Validate(IsDate, {
    message: i18nValidationMessage('validation.IS_ISO8601'),
  })
  readonly from!: string;
}

export class BaseQueryToDate {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @Validate(IsDate, {
    message: i18nValidationMessage('validation.IS_ISO8601'),
  })
  readonly to!: string;
}

export class BaseQueriesDatesRange {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @Validate(IsDate, {
    message: i18nValidationMessage('validation.IS_ISO8601'),
  })
  @IsDateBefore('to', {
    message: i18nValidationMessage('validation.IS_DATE_BEFORE'),
  })
  readonly from!: string;

  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @Validate(IsDate, {
    message: i18nValidationMessage('validation.IS_ISO8601'),
  })
  @IsDateAfter('from', {
    message: i18nValidationMessage('validation.IS_DATE_AFTER'),
  })
  readonly to!: string;
}

export class BaseQueryLang {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsEnum(['ru', 'en'], {
    message: i18nValidationMessage('validation.IS_ENUM'),
  })
  readonly lang!: Lang;
}

export class BaseQueryOrder {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsEnum(['ASC', 'DESC', undefined], {
    message: i18nValidationMessage('validation.IS_ENUM'),
  })
  readonly order!: Order;
}

export const extractQueriesKeysFromClass = <T extends { keys: string[] }>(
  ...args: T[]
) => {
  return args.reduce<string[]>((acc, current) => [...acc, ...current.keys], []);
};
