import {
  Controller,
  Req,
  Get,
  Param,
  Query,
  Post,
  Put,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Request } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { handler } from '../../utils/handler';
import { RO } from '../../declarations/service';
import { Student } from './student.entity';
import CreateDto from './dto/create-student.dto';
import { StudentService } from './student.service';

@UseGuards(JwtAuthGuard)
@ApiTags('学生')
@Controller('student')
@ApiBearerAuth('JWT')
export class StudentController {
  constructor(private readonly service: StudentService) {}

  @Get('')
  @ApiOperation({ summary: '列表' })
  @ApiQuery({ name: 'name', description: '姓名', schema: { default: '' } })
  @ApiResponse({
    status: 200,
    description: '操作成功',
    schema: {
      example: {
        code: 0,
        data: { list: [{ id: 1, name: '名称', description: '描述' }] },
      },
    },
  })
  list(@Query('name') name: string, @Req() req: Request): Promise<RO> {
    console.log((req.user as any).data); // {id, name, account, password, iat, exp}
    return handler(() => this.service.list(name));
  }

  @Get(':id')
  @ApiOperation({ summary: '详情' })
  @ApiParam({ name: 'id', description: 'id', schema: { default: 1 } })
  @ApiResponse({
    status: 200,
    description: '操作成功',
    schema: {
      example: { code: 0, data: { id: 1, name: '名称', description: '描述' } },
    },
  })
  detail(@Param() params: { id: string }): Promise<RO> {
    return handler(() => this.service.detail(parseInt(params.id, 10)));
  }

  @Post('')
  @ApiOperation({ summary: '创建' })
  @ApiBody({ type: CreateDto })
  @ApiResponse({
    status: 200,
    description: '操作成功',
    schema: { example: { code: 0, data: { id: 1 } } },
  })
  create(@Body() student: CreateDto): Promise<RO> {
    return handler(() => this.service.create(student));
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑' })
  @ApiParam({ name: 'id', description: 'id', schema: { default: 1 } })
  @ApiBody({ type: Student })
  @ApiResponse({
    status: 200,
    description: '操作成功',
    schema: { example: { code: 0 } },
  })
  update(
    @Param() params: { id: string },
    @Body() student: Partial<Student>,
  ): Promise<RO> {
    return handler(() => this.service.update(parseInt(params.id, 10), student));
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除' })
  @ApiParam({ name: 'id', description: 'id', schema: { default: 1 } })
  @ApiResponse({
    status: 200,
    description: '操作成功',
    schema: { example: { code: 0 } },
  })
  delete(@Param() params: { id: string }): Promise<RO> {
    return handler(() => this.service.delete(parseInt(params.id, 10)));
  }
}
