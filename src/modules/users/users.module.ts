import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './models/profile.entity';
import { UsersRepository } from './models/user.repository';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository, Profile])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
