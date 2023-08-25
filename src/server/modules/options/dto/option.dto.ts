import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { i18nValidationMessage } from 'src/i18n/i18nValidationMessage';
import { OptionEntity } from '../entities/option.entity';

export class PostOptionDto {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  name!: OptionEntity['name'];

  @IsNotEmpty()
  @IsInt({ message: i18nValidationMessage('validation.IS_INT') })
  @Min(1, { message: i18nValidationMessage('validation.MIN') })
  cost_in_points!: OptionEntity['cost_in_points'];

  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsInt({ message: i18nValidationMessage('validation.IS_INT') })
  @Min(1, { message: i18nValidationMessage('validation.MIN') })
  cost_in_adenas!: OptionEntity['cost_in_adenas'];
}

export class PatchOptionDto {
  @IsOptional()
  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  name!: OptionEntity['name'];
}
