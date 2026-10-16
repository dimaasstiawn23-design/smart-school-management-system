import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Mengaktifkan CORS untuk frontend
  app.enableCors();

  // Best Practice: Global Validation untuk DTO
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = process.env.PORT || 5000;
  await app.listen(port);
  
  console.log(`Backend Core is running on: http://localhost:${port}`);
}
bootstrap();