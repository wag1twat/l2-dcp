import { IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMessage } from 'src/i18n/i18nValidationMessage';
import { UserEntity } from '../entities/user.entity';

export class PostUserDto {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  name!: UserEntity['name'];
}
