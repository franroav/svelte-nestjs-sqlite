// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { seedDatabase } from './seed';
import { CustomHttpException } from "./exeption/custom-http.exception";
import { HttpStatus, VersioningType } from "@nestjs/common";
import { Logger } from 'nestjs-pino';

import { ValidationPipe } from './pipes/class-validator/validation.pipe';

async function bootstrap() {
  const env = process.env.ENV || 'production';
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
});
app.useLogger(app.get(Logger));
  const config = new DocumentBuilder()
    .setTitle('Cosechas')
    .setDescription('cosechas API')
    .setVersion('1.0')
    .addTag('cosechas')
    .build()
  const sequelize = app.get(Sequelize);
  try {
    await seedDatabase(sequelize);
  } catch (error) {
    throw new CustomHttpException(
      `Error de base de datos: ${error}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
      'server error'
  );
  }
  // Seed database with sample data
  

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors();
  await app.listen(port);
}
bootstrap();