import { IsISO8601, IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'src/i18n/i18nValidationMessage';

export class DaysRenderQueriesDto {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsISO8601(undefined, {
    message: i18nValidationMessage('validation.IS_ISO8601'),
  })
  from!: string;

  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsISO8601(undefined, {
    message: i18nValidationMessage('validation.IS_ISO8601'),
  })
  to!: string;
}
