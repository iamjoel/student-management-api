import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from '../../utils/valid';
import { IdInfo } from './id-info.entity';
import CreateDto from './dto/create-id-info.dto';

@Injectable()
export class IdInfoService {
  constructor(
    @InjectRepository(IdInfo)
    private readonly idInfoRepository: Repository<IdInfo>,
  ) {}

  async list(idNo?: string): Promise<{list: IdInfo[], totalCount: number}>{
    const qb = this.idInfoRepository.createQueryBuilder('t');
    if(idNo) {
      qb.andWhere('t.idNo like :idNo', { idNo: `%${idNo}%` });
    }

    const totalCount = await qb.getCount();
    const list = await qb.getMany();

    return {
        list,
        totalCount
    }
  }

  async detail(id: number): Promise<IdInfo> {
    return this.idInfoRepository.findOne(id)
  }

  async create(idInfo: CreateDto): Promise<{id: number}> {
    const errorMessage = await validate(idInfo, new CreateDto());
    if (errorMessage) {
      throw errorMessage;
    }

    const newIdInfo = new IdInfo();
    Object.keys(idInfo).forEach(key => {
      newIdInfo[key] = idInfo[key];
    });

    const { id } = await this.idInfoRepository.save(newIdInfo);
    
    return { id };
  }

  async update(id: number, idInfo: Partial<IdInfo>): Promise<void> {
    await this.idInfoRepository.update(id, idInfo)
  }

  async delete(id: number): Promise<void> {
    await this.idInfoRepository.softDelete(id);
  }
}