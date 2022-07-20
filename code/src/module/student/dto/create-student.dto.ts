import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateStudentDto {
  @ApiProperty({
    description: '名称',
    default: '',
  })
  @IsNotEmpty({ message: '名称不能为空' })
  readonly name: string;

  @ApiProperty({
    description: '身份证Id',
    default: '1',
  })
  @IsNotEmpty({ message: '身份证Id 不能为空' })
  readonly idInfoId: string;

  @ApiProperty({
    description: '教师Ids',
    default: [1],
  })
  readonly teacherIds: number[];

  @ApiProperty({
    description: '描述',
    default: '',
  })
  description: string;
}
