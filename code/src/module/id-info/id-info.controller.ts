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
import { ApiTags, ApiOperation, ApiQuery, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { handler } from '../../utils/handler';
import { RO } from '../../declarations/service';
import { IdInfo } from './id-info.entity';
import { IdInfoService } from './id-info.service';


@ApiTags('学生的 ID 信息')
@Controller('idInfo')
export class IdInfoController {
  constructor(private readonly service: IdInfoService) {}

  @Get('')
  @ApiOperation({ summary: '列表' })
  @ApiQuery({ name: 'idNo', description: '身份证号', schema: { default: '' } })
  @ApiResponse({ status: 200, description: '操作成功', schema: {example: {code: 0, data: {list: [{id: 1, idNo: '身份证号', description: '描述'}]} }} })
  list(@Query('idNo') idNo: string): Promise<RO> {
    return handler(() => this.service.list(idNo))
  }

  @Get(':id')
  @ApiOperation({ summary: '详情' })
  @ApiParam({ name: 'id', description: 'id' , schema: { default: 1 } })
  @ApiResponse({ status: 200, description: '操作成功', schema: {example: {code: 0, data: {id: 1, idNo: '身份证号', description: '描述'}}} })
  detail(@Param() params: { id: string }): Promise<RO> {
    return handler(() => this.service.detail(parseInt(params.id, 10)))
  }

  @Post('')
  @ApiOperation({ summary: '创建' })
  @ApiBody({ type: IdInfo})
  @ApiResponse({ status: 200, description: '操作成功', schema: {example: {code: 0, data: {id: 1}}}})
  create(@Body() idInfo: IdInfo): Promise<RO> {
    return handler(() => this.service.create(idInfo))
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑' })
  @ApiParam({ name: 'id', description: 'id' , schema: { default: 1 } })
  @ApiBody({ type: IdInfo})
  @ApiResponse({ status: 200, description: '操作成功', schema: {example: {code: 0}} })
  update(
    @Param() params: { id: string },
    @Body() idInfo: Partial<IdInfo>
  ): Promise<RO> {
    return handler(() => this.service.update(parseInt(params.id, 10), idInfo))
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除' })
  @ApiResponse({ status: 200, description: '操作成功', schema: {example: {code: 0}} })
  delete(@Param() params: { id: string }): Promise<RO> {
    return handler(() => this.service.delete(parseInt(params.id, 10)))
  }
}