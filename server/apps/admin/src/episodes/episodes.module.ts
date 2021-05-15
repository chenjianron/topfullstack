import { Course } from '@app/db/models/course.model';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { EpisodesController } from './episodes.controller';

@Module({
  // imports:[TypegooseModule.forFeature([Course])],
  controllers: [EpisodesController]
})
export class EpisodesModule {}
