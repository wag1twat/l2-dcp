import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  Min,
  ArrayMinSize,
  ValidateNested,
  IsISO8601,
  IsUUID,
} from 'class-validator';
import { i18nValidationMessage } from 'src/i18n/i18nValidationMessage';
import { OptionEntity } from 'src/server/modules/options/entities/option.entity';

class Option {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsUUID('all', {
    message: i18nValidationMessage('validation.IS_UUID'),
  })
  id!: OptionEntity['id'];

  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsInt({ message: i18nValidationMessage('validation.IS_INT') })
  @Min(1, { message: i18nValidationMessage('validation.MIN') })
  count!: number;

  @IsArray({ message: i18nValidationMessage('validation.IS_ARRAY') })
  @ArrayMinSize(1, { message: i18nValidationMessage('validation.ARRAY_MIN') })
  @IsUUID('all', {
    each: true,
    message: i18nValidationMessage('validation.IS_UUID'),
  })
  users!: string[];
}

export class PostDayDto {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsISO8601(undefined, {
    message: i18nValidationMessage('validation.IS_ISO8601'),
  })
  date!: string;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.NOT_EMPTY'),
  })
  @IsArray({ message: i18nValidationMessage('validation.IS_ARRAY') })
  @ArrayMinSize(1, { message: i18nValidationMessage('validation.ARRAY_MIN') })
  @ValidateNested({ each: true })
  @Type(() => Option)
  options!: Option[];
}

export class PatchDayDto extends PostDayDto {
  constructor() {
    super();
  }
}
