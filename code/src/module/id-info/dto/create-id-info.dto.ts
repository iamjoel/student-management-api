import { IsNotEmpty } from 'class-validator';

export default class CreateIdInfoDto {
  @IsNotEmpty({ message: '身份证号不能为空' })
  readonly idNo: string;
}
