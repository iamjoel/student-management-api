import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from '../../utils/valid';
import { Pet } from './pet.entity';
import { Student } from '../student/student.entity';
import CreateDto from './dto/create-pet.dto';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async list(name?: string): Promise<{ list: Pet[]; totalCount: number }> {
    const qb = this.petRepository.createQueryBuilder('t');
    if (name) {
      qb.andWhere('t.name like :name', { id: `%${name}%` });
    }

    qb.leftJoinAndSelect('t.owner', 's');

    const totalCount = await qb.getCount();
    const list = await qb.getMany();

    return {
      list,
      totalCount,
    };
  }

  async detail(id: number): Promise<Pet> {
    return this.petRepository.findOne(id);
  }

  async create(pet: CreateDto): Promise<{ id: number }> {
    const errorMessage = await validate(pet, new CreateDto());
    if (errorMessage) {
      throw errorMessage;
    }

    const newPet = new Pet();
    Object.keys(pet).forEach(key => {
      newPet[key] = pet[key];
    });

    const owner = await this.studentRepository.findOne(pet.ownerId);
    if (!owner) {
      throw '未找到主人信息';
    }
    newPet.owner = owner;

    const { id } = await this.petRepository.save(newPet);

    return { id };
  }

  async update(id: number, pet: Partial<Pet>): Promise<void> {
    await this.petRepository.update(id, pet);
  }

  async delete(id: number): Promise<void> {
    await this.petRepository.softDelete(id);
  }
}
