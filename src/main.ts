import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.enableCors({
    origin: config.get<string>('FRONTEND_URL'),
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.use(cookieParser());
  if (config.get<string>('NODE_ENV') === 'development') {
  const config = new DocumentBuilder()
    .setTitle('API de Gestión de Inmuebles')
    .setDescription('Documentación de la API con Swagger')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  }
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(config.get<number>('PORT') ?? 3000);
}
bootstrap();
