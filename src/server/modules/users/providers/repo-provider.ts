import { Injectable } from '@nestjs/common';
import { createRepositoryProvider } from 'src/server/utils';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
}

export const usersRepositoryProvider = createRepositoryProvider(UserEntity);
