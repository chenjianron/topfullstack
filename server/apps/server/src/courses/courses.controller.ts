import { Course } from '@app/db/models/course.model';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
    model:Course,
    routes:{
        create:false,
        delete:false,
        update:false,
    }
})
@ApiTags('课程')
@Controller('courses')
export class CoursesController {
    constructor(@InjectModel(Course) private readonly model : ReturnModelType<typeof Course>){

    }
}
