import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreatePetDto {
  @ApiProperty({
    description: '名称',
    default: 1,
  })
  @IsNotEmpty({ message: '名称不能为空' })
  readonly name: string;

  @ApiProperty({
    description: '主人Id',
    default: 1,
  })
  @IsNotEmpty({ message: '主人Id 不能为空' })
  readonly ownerId: number;

  @ApiProperty({
    description: '描述',
    default: '',
  })
  description: string;
}
