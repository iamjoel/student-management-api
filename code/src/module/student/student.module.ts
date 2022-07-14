import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';

@Module({
  imports: [],
  providers: [StudentService], // 为服务提供注册商
  controllers: [StudentController], // 控制器
})
export class StudentModule {}