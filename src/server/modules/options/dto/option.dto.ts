import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { OptionEntity } from '../entities/option.entity';

export class PostOptionDto {
  @IsNotEmpty()
  @IsString()
  name!: OptionEntity['name'];
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  cost_in_points!: OptionEntity['cost_in_points'];
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  cost_in_adenas!: OptionEntity['cost_in_adenas'];
}

export class PatchOptionDto {
  @IsOptional()
  @IsString()
  name!: OptionEntity['name'];
}
