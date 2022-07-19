import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './module/student/student.module';
import { PetModule } from './module/pet/pet.module';
import { TeacherModule } from './module/teacher/teacher.module';
import { IdInfoModule } from './module/id-info/id-info.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    StudentModule,
    PetModule,
    TeacherModule,
    IdInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
