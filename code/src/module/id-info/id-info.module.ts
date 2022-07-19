import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdInfoService } from './id-info.service';
import { IdInfoController } from './id-info.controller';
import { IdInfo } from './id-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IdInfo])], // 引入实体类
  providers: [IdInfoService], // 为服务提供注册商
  controllers: [IdInfoController], // 控制器
})
export class IdInfoModule {}