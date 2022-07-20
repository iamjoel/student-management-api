import { Entity, Column, ManyToOne } from 'typeorm';
import BaseEntity from '../common/base-entity';
import { Student } from '../student/student.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Pet extends BaseEntity {
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

  @ManyToOne(
    () => Student,
    student => student.pets,
  )
  owner: Student
}
