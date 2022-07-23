import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); // 加全局路由的前缀

  //  Swagger start
  const options = new DocumentBuilder()
    .setTitle('学生信息管理系统')
    .setDescription('管理学生信息。')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document); // 访问文档地址：http://127.0.0.1:3010/api-doc
  //  Swagger end

  await app.listen(3010);
}
bootstrap();
