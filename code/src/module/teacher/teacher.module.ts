import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { Teacher } from './teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])], // 引入实体类
  providers: [TeacherService], // 为服务提供注册商
  controllers: [TeacherController], // 控制器
})
export class TeacherModule {}