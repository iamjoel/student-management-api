import { Entity, Column } from 'typeorm';
import BaseEntity from '../common/base-entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class IdInfo extends BaseEntity {
  @ApiProperty({
    description: '身份证号',
    default: '',
  })
  @Column()
  idNo: string;

  @ApiProperty({
    description: '描述',
    default: '',
  })
  @Column()
  description: string;
}
