import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from '../../utils/valid';
import { Student } from './student.entity';
import { IdInfo } from '../id-info/id-info.entity';
import CreateDto from './dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(IdInfo)
    private readonly idInfoRepository: Repository<IdInfo>,
  ) {}

  async list(name?: string): Promise<{list: Student[], totalCount: number}>{
    const qb = this.studentRepository.createQueryBuilder('t');
    if(name) {
      qb.andWhere('t.name like :name', { id: name });
    }

    qb.leftJoinAndSelect('t.idInfo', 'idInfo')

    const totalCount = await qb.getCount();
    const list = await qb.getMany();

    return {
        list,
        totalCount
    }
  }

  async detail(id: number): Promise<Student> {
    return this.studentRepository.findOne(id)
  }

  async create(student: CreateDto): Promise<{id: number}> {
    const errorMessage = await validate(student, new CreateDto());
    if (errorMessage) {
      throw errorMessage;
    }

    const newStudent = new Student();
    Object.keys(student).forEach(key => {
      newStudent[key] = student[key];
    });

    const idInfo = await this.idInfoRepository.findOne(
      student.idInfoId,
    );
    if (!idInfo) {
      throw '未找到身份证';
    }
    newStudent.idInfo = idInfo;

    const { id } = await this.studentRepository.save(newStudent);
    
    return { id };
  }

  async update(id: number, student: Partial<Student>): Promise<void> {
    await this.studentRepository.update(id, student)
  }

  async delete(id: number): Promise<void> {
    await this.studentRepository.softDelete(id);
  }
}