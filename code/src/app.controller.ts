import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { RO } from './declarations/service';
import { handler } from './utils/handler';
import { AppService } from './app.service';

import * as fs from 'fs-extra';

@ApiTags('通用')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 文件上传
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(@UploadedFile() file: Express.Multer.File): Promise<RO> {
    return handler(() => {
      const fileName = `${Date.now()}-${file.originalname}`; // 会写到项目根目录
      const filePath = `upload/files/${fileName}`;
      fs.outputFileSync(filePath, file.buffer, 'utf8');
      return {
        file: fileName,
      };
    });
  }
}
