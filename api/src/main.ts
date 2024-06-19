// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { seedDatabase } from './seed';
import { CustomHttpException } from './exeption/custom-http.exception';
import { HttpStatus, VersioningType } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { AppConfigService } from './config/configuration.service';
import { ValidationPipe } from './pipes/class-validator/validation.pipe';
import { GlobalExceptionsFilters } from './filters/global-exception.filter';

async function bootstrap() {
  const env = process.env.ENV || 'production';
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(AppConfigService);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useLogger(app.get(Logger));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  if (appConfig.appActiveSwagger) {
    const options = new DocumentBuilder()
      .setTitle('Cosechas')
      .setDescription('cosechas API')
      .setVersion('1.0')
      .addTag('cosechas')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }

  if (appConfig.appActiveDatabase) {
    const sequelize = app.get(Sequelize);

    try {
      await seedDatabase(sequelize);
    } catch (error) {
      throw new CustomHttpException(
        `Error de base de datos: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'server error',
      );
    }
  }

    // Apply the global exception filter
    app.useGlobalFilters(new GlobalExceptionsFilters());

  await app.listen(port);
}
bootstrap();
