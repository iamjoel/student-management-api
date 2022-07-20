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
import { Pet } from './pet.entity';
import CreateDto from './dto/create-pet.dto';
import { PetService } from './pet.service';


@ApiTags('宠物')
@Controller('pet')
export class PetController {
  constructor(private readonly service: PetService) {}

  @Get('')
  @ApiOperation({ summary: '列表' })
  @ApiQuery({ name: 'name', description: '姓名', schema: { default: '' } })
  @ApiResponse({ status: 200, description: '操作成功', schema: {example: {code: 0, data: {list: [{id: 1, name: '名称', description: '描述'}]} }} })
  list(@Query('name') name: string): Promise<RO> {
    return handler(() => this.service.list(name))
  }

  @Get(':id')
  @ApiOperation({ summary: '详情' })
  @ApiParam({ name: 'id', description: 'id' , schema: { default: 1 } })
  @ApiResponse({ status: 200, description: '操作成功', schema: {example: {code: 0, data: {id: 1, name: '名称', description: '描述'}}} })
  detail(@Param() params: { id: string }): Promise<RO> {
    return handler(() => this.service.detail(parseInt(params.id, 10)))
  }

  @Post('')
  @ApiOperation({ summary: '创建' })
  @ApiBody({ type: CreateDto})
  @ApiResponse({ status: 200, description: '操作成功', schema: {example: {code: 0, data: {id: 1}}}})
  create(@Body() pet: CreateDto): Promise<RO> {
    return handler(() => this.service.create(pet))
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑' })
  @ApiParam({ name: 'id', description: 'id' , schema: { default: 1 } })
  @ApiBody({ type: Pet})
  @ApiResponse({ status: 200, description: '操作成功', schema: {example: {code: 0}} })
  update(
    @Param() params: { id: string },
    @Body() pet: Partial<Pet>
  ): Promise<RO> {
    return handler(() => this.service.update(parseInt(params.id, 10), pet))
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除' })
  @ApiResponse({ status: 200, description: '操作成功', schema: {example: {code: 0}} })
  delete(@Param() params: { id: string }): Promise<RO> {
    return handler(() => this.service.delete(parseInt(params.id, 10)))
  }
}