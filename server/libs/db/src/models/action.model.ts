import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Course } from './course.model';
import { Episode } from './episode.model';
import { User } from './user.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Action {
  @prop({ ref: 'User' })
  user: Ref<User>;

  @prop({ enum: ['like', 'upVote', 'downVote'] })
  name: string;

  @prop({ enum: ['Course', 'Episode'] })
  type: string;

  @prop({ refPath: 'type' })
  object: Ref<Course | Episode>;
}
