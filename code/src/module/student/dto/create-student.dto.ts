import { IsNotEmpty } from 'class-validator';

export default class CreateStudentDto {
  @IsNotEmpty({ message: '名称不能为空' })
  readonly name: string;

  @IsNotEmpty({ message: '身份证Id 不能为空' })
  readonly idInfoId: string;
}
