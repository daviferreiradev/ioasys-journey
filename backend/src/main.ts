// Soli Deo Gloria
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Ioasys Journey API')
    .setDescription('The Ioasys Journey API')
    .setVersion('1.0')
    .addTag('nestjs')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter JWT token',
      in: 'header',
    }, 'KEY_AUTH')
    .build()
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT || 10000;
  await app.listen(PORT, '0.0.0.0');
  console.log(`Application is running on: ${PORT}`);
}

bootstrap();
