import { IntersectionType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'src/i18n/i18nValidationMessage';
import {
  BaseQueriesDatesRange,
  BaseQueryOrder,
} from '../../queries/dto/base-queries.dto';

export class GetQueriesDto extends IntersectionType(
  BaseQueriesDatesRange,
  BaseQueryOrder,
) {
  constructor(queries: GetQueriesDto) {
    super();
    Object.assign(this, queries);
  }
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsEnum(['date', 'points', 'adenas'], {
    message: i18nValidationMessage('validation.IS_ENUM'),
  })
  readonly orderBy!: 'date' | 'points' | 'adenas';
}

export type GetQueriesType = GetQueriesDto;
