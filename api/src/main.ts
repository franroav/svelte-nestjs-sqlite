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
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import csurf from 'csurf';
import { CorrelationIdMiddleware } from './middleware/correlation-id.middleware';

async function bootstrap() {
  const env = process.env.ENV || 'production';
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(AppConfigService);

  // Security middlewares
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  app.use(csurf());
  // versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });
  // logger middlewares
  app.useLogger(app.get(Logger));
  // prefix
  app.setGlobalPrefix('api');
  // cors
  app.enableCors();
  // documentation
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
  // database
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
  // Apply the DTO validation Pipe
  app.useGlobalPipes(new ValidationPipe());
  // Apply other global middlewares and filters
  app.use(new CorrelationIdMiddleware().use);
  app.useGlobalFilters(new GlobalExceptionsFilters());

  await app.listen(port);
}
bootstrap();
