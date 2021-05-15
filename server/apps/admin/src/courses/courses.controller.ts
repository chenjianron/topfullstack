import { Course } from '@app/db/models/course.model';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
    model: Course
})
@ApiTags('课程')
@Controller('courses')
export class CoursesController {
    constructor(@InjectModel(Course)private readonly model: ReturnModelType<typeof Course>){}

    @Get('option')
    option(){
        return {
            title:'课程管理',
            selection: true,
            column: [
              {
                label: "课程名称",
                prop: "name",
                sortable:true,
                search:true,
                regex: true,
                row: true,
                span: 24,
              },
              {
                label: "课程封面图",
                prop: "cover",
                type: 'upload',
                listType: 'picture-img',
                action: '/upload',
                row:true,
                width: 120
              },
            ],
          }
    }
}
