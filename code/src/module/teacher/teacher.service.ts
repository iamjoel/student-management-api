import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from '../../utils/valid';
import { Teacher } from './teacher.entity';
import CreateDto from './dto/create-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async list(name?: string): Promise<{ list: Teacher[]; totalCount: number }> {
    const qb = this.teacherRepository.createQueryBuilder('t');
    if (name) {
      qb.andWhere('t.name like :name', { id: `%${name}%` });
    }

    qb.leftJoinAndSelect('t.students', 'student');

    const totalCount = await qb.getCount();
    const list = await qb.getMany();

    return {
      list,
      totalCount,
    };
  }

  async detail(id: number): Promise<Teacher> {
    return this.teacherRepository.findOne(id);
  }

  async create(teacher: CreateDto): Promise<{ id: number }> {
    const errorMessage = await validate(teacher, new CreateDto());
    if (errorMessage) {
      throw errorMessage;
    }

    const newTeacher = new Teacher();
    Object.keys(teacher).forEach(key => {
      newTeacher[key] = teacher[key];
    });

    const { id } = await this.teacherRepository.save(newTeacher);

    return { id };
  }

  async update(id: number, teacher: Partial<Teacher>): Promise<void> {
    await this.teacherRepository.update(id, teacher);
  }

  async delete(id: number): Promise<void> {
    await this.teacherRepository.softDelete(id);
  }
}
