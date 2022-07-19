import { Entity, Column } from 'typeorm';
import BaseEntity from '../common/base-entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Student extends BaseEntity {
  @ApiProperty({
    description: '名称',
    default: '',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: '描述',
    default: '',
  })
  @Column()
  description: string;
}
