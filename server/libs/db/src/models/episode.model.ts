import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Course } from "./course.model";

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Episode {
    @ApiProperty({ description: '课时名称' })
    @prop()
    name: string

    @ApiProperty({ description: '上传的文件' })
    @prop()
    file: string

    @prop({ ref: "Course" })
    course: Ref<Course>
}