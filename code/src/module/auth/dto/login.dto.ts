import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class LoginDto {
  @ApiProperty({
    description: '帐号',
    default: 'admin',
  })
  @IsNotEmpty({ message: '帐号不能为空' })
  readonly account: string;

  @ApiProperty({
    description: '密码',
    default: '1',
  })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}
