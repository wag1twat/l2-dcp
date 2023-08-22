import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { I18nValidationExceptionFilter } from 'nestjs-i18n';
import { TypeOrmExceptionFilter } from 'src/server/filters';
import { TransformResponseInterceptor } from 'src/server/interceptors';
import { PostUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('api/users')
@UseInterceptors(TransformResponseInterceptor)
@UseFilters(new I18nValidationExceptionFilter(), TypeOrmExceptionFilter)
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async get() {
    return await this.usersService.get();
  }

  @Post()
  async post(@Body() dto: PostUserDto) {
    return await this.usersService.post(dto);
  }
}
