import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse, ApiParam, ApiProperty } from '@nestjs/swagger';
import { RO } from '../../declarations/service';

import { StudentService } from './student.service';

class Student {
  @ApiProperty({
    description: '名称',
    default: '',
  })
  name: string
}

@ApiTags('学生')
@Controller('student')
export class StudentController {
  constructor(private readonly service: StudentService) {}

  @Get('')
  @ApiOperation({ summary: '列表' })
  @ApiQuery({ name: 'name', description: '姓名', schema: { default: '' } })
  @ApiResponse({ status: 200, description: '操作成功' })
  list(@Query('name') name: string): RO {
    return this.service.list(name)
  }

  @Get(':id')
  @ApiOperation({ summary: '详情' })
  @ApiParam({ name: 'id', description: 'id' , schema: { default: 1 } })
  @ApiResponse({ status: 200, description: '操作成功' })
  detail(@Param() params: { id: string }): RO {
    return this.service.detail(parseInt(params.id, 10))
  }

  @Post('')
  @ApiOperation({ summary: '创建' })
  @ApiResponse({ status: 200, description: '操作成功' })
  create(@Body() student: Student) {
    return this.service.create(student.name)
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑' })
  @ApiParam({ name: 'id', description: 'id' , schema: { default: 1 } })
  @ApiResponse({ status: 200, description: '操作成功' })
  update(
    @Param() params: { id: string },
    @Body() student: Student
  ): RO {
    return this.service.update(parseInt(params.id, 10), student.name)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除' })
  @ApiResponse({ status: 200, description: '操作成功' })
  delete(@Param() params: { id: string }): RO {
    return this.service.delete(parseInt(params.id, 10))
  }
}