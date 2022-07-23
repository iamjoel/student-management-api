import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { Pet } from './pet.entity';
import { Student } from '../student/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pet, Student])], // 引入实体类
  providers: [PetService], // 为服务提供注册商
  controllers: [PetController], // 控制器
})
export class PetModule {}
