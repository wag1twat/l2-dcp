import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { OptionEntity } from 'src/server/modules/options/entities/option.entity';

class PostOption {
  @IsNotEmpty()
  @IsString()
  id!: OptionEntity['id'];

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  count!: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  users!: string[];
}

export class PostDayDto {
  @IsNotEmpty()
  @IsString()
  date!: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PostOption)
  options!: PostOption[];
}

class PatchOption {
  @IsNotEmpty()
  @IsString()
  id!: OptionEntity['id'];

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  count!: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  users!: string[];
}

export class PatchDayDto extends PostDayDto {
  constructor() {
    super();
  }

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PatchOption)
  options!: PatchOption[];
}
