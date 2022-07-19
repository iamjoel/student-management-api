import { IsNotEmpty } from 'class-validator';

export default class CreateTeacherDto {
  @IsNotEmpty({ message: '名称不能为空' })
  readonly name: string;
}
