import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({
      description: '用户名',
      example: 'user',
    })
    username: string;
    @ApiProperty({
      description: '密码',
      example: 'password',
    })
    password: string;
  }