import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';

const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');
  app.use(express.static(path.join(__dirname, 'public')));
  app.enableCors();
  await app.listen(PORT);
  console.log(`Api is listening on port ${PORT}`);
}
bootstrap();
