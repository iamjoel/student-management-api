import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student } from './student.entity';
import { IdInfo } from '../id-info/id-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, IdInfo])], // 引入实体类
  providers: [StudentService], // 为服务提供注册商
  controllers: [StudentController], // 控制器
})
export class StudentModule {}