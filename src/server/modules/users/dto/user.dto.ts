import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class PostUserDto {
  @IsNotEmpty()
  @IsString()
  name!: UserEntity['name'];
}
