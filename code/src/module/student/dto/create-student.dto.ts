import { IsNotEmpty } from 'class-validator';

export default class CreateStudentDto {
  @IsNotEmpty({ message: '名称不能为空' })
  readonly name: string;
}
