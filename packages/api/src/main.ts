import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(PORT);
  console.log(`Api is listening on port ${PORT}`);
}
bootstrap();
