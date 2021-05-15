import { User } from '@app/db/models/user.model';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersController } from './users.controller';

@Module({
  imports:[TypegooseModule.forFeature([User])],
  controllers: [UsersController]
})
export class UsersModule {}
