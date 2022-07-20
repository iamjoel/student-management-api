import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import BaseEntity from '../common/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { Student } from '../student/student.entity';
@Entity()
export class Teacher extends BaseEntity {
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

  @ManyToMany(
    () => Student,
    student => student.teachers
  )
  @JoinTable()
  students: Student[] 
}
