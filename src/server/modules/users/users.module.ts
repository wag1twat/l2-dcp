import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/server/database/database.module';
import { usersRepositoryProvider } from './providers/repo-provider';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [usersRepositoryProvider(), UsersService],
})
export class UsersModule {}
