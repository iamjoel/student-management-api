import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { RO } from '../../declarations/service';

import { StudentService } from './student.service';

interface Student {
  name: string
}

@Controller('student')
export class StudentController {
  constructor(private readonly service: StudentService) {}

  @Get('')
  list(): RO {
    console.log('list')
    return this.service.list()
  }

  @Get(':id')
  detail(@Param() params: { id: string }): RO {
    return this.service.detail(parseInt(params.id, 10))
  }

  @Post('')
  create(@Body() student: Student) {
    return this.service.create(student.name)
  }

  @Put(':id')
  update(
    @Param() params: { id: string },
    @Body() student: Student
  ): RO {
    return this.service.update(parseInt(params.id, 10), student.name)
  }

  @Delete(':id')
  delete(@Param() params: { id: string }): RO {
    return this.service.delete(parseInt(params.id, 10))
  }
}