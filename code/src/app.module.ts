import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as appRoot from 'app-root-path';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './module/student/student.module';
import { PetModule } from './module/pet/pet.module';
import { TeacherModule } from './module/teacher/teacher.module';
import { IdInfoModule } from './module/id-info/id-info.module';
import { AuthModule } from './module/auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    // 配置 https://github.com/nestjs/serve-static/blob/master/lib/interfaces/serve-static-options.interface.ts
    ServeStaticModule.forRoot({
      // 静态服务器。 server 上传的文件用。
      rootPath: join(appRoot.path, 'upload'), // 文件夹路径
      exclude: ['/api*'],
      serveStaticOptions: {
        index: false,
      },
    }),
    StudentModule,
    PetModule,
    TeacherModule,
    IdInfoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
