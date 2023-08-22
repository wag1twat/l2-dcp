import { Inject, Injectable } from '@nestjs/common';
import { dataSource } from 'src/server/database/datasource';
import { Repository } from 'typeorm';
import { PostUserDto } from './dto/user.dto';
import { UserDayEntity } from './entities/user-day.entity';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserEntity.name)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async get() {
    return await this.usersRepository.find({
      relations: { days: { user: true, day: true } },
    });
  }

  async post(dto: PostUserDto) {
    const entity = this.usersRepository.create();

    Object.assign(entity, dto);

    return await this.usersRepository.save(entity);
  }
}
