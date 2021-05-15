import { User } from '@app/db/models/user.model';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
    model:User
})
@ApiTags('用户')
@Controller('users')
export class UsersController {
    constructor(@InjectModel(User) private readonly model){}

    @Get('option')
    option(){
        return {
            title:'用户管理',
            column: [
              {
                label: "用户名",
                prop: "username",
              },
            //   {
            //     label: "课时封面图",
            //     prop: "cover",
            //   },
            ],
          }
    }
}
