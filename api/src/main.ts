// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { seedDatabase } from './seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('Cosechas')
    .setDescription('cosechas API')
    .setVersion('1.0')
    .addTag('cosechas')
    .build()
  const sequelize = app.get(Sequelize);
  
  // Seed database with sample data
  await seedDatabase(sequelize);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();