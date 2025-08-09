import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置允许跨域
  app.enableCors();

  app.use(json({ limit: '10mb' }));

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  const configService = app.get(ConfigService);
  const port = configService.get('PORT', 8080);
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
