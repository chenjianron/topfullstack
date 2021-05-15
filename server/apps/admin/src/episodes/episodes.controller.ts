import { Course } from '@app/db/models/course.model';
import { Episode } from '@app/db/models/episode.model';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Episode,
})
@ApiTags('课时')
@Controller('episodes')
export class EpisodesController {
  constructor(
    @InjectModel(Episode)
    private readonly model: ReturnModelType<typeof Episode>,
    @InjectModel(Course)
    private readonly course: ReturnModelType<typeof Course>,
  ) {}
  @Get('option')
  async option() {
    const courses = (await this.course.find()).map((v) => ({
      label: v.name,
      value: v._id,
    }));
    return {
      title: '课时管理',
      translate: false,
      column: [
        {
          label: '所属课程',
          prop: 'course',
          row: true,
          type: 'select',
          dicData: courses,
        },
        {
          label: '课时名称',
          prop: 'name',
          span: 24,
        },
        {
          label: '视频文件',
          prop: 'file',
          span: 24,
          type: 'upload',
          action: 'upload',
          listType: 'picture-img',
          // width: '120'
        },
      ],
    };
  }
}
