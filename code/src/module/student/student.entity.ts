import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import BaseEntity from '../common/base-entity';
import { IdInfo } from '../id-info/id-info.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Student extends BaseEntity {
  @ApiProperty({
    description: '名称',
    default: '',
  })
  @Column()
  name: string;

  @OneToOne(
    () => IdInfo,
    idInfo => idInfo.student,
    {
      cascade: true,
    },
  )
  @JoinColumn()
  idInfo: IdInfo;

  @ApiProperty({
    description: '描述',
    default: '',
  })
  @Column()
  description: string;
}
