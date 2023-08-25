import { Inject, Injectable } from '@nestjs/common';
import { DATA_SOURCE } from 'src/server/database/database.provider';
import { DataSource } from 'typeorm';
import { PostUserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@Inject(DATA_SOURCE) private readonly dataSource: DataSource) {}

  async get() {
    return await this.dataSource.getRepository(UserEntity).find({
      relations: { days: { user: true, day: true } },
    });
  }

  async post(dto: PostUserDto) {
    const entity = this.dataSource.getRepository(UserEntity).create();

    Object.assign(entity, dto);

    return await this.dataSource.getRepository(UserEntity).save(entity);
  }
}
