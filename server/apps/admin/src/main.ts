import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AdminModule);
  app.enableCors();

  app.useStaticAssets('uploads', {
    prefix:'/uploads'
  })
  
  const options = new DocumentBuilder()
    .setTitle('全栈之巅-后台管理API')
    .setDescription('供后台管理界面调用的服务端API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  
  const PORT = process.env.ADMIN_PORT || 3001
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}/api-docs`)
}
bootstrap();
