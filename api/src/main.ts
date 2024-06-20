import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { seedDatabase } from './seed';
import { CustomHttpException } from './exeption/custom-http.exception';
import { HttpStatus, VersioningType } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { AppConfigService } from './config/configuration.service';
import { ValidationPipe } from './pipes/class-validator/validation.pipe';
import { GlobalExceptionsFilters } from './filters/global-exception.filter';
import helmet from 'helmet';
import csurf from 'csurf';
import fastifyRateLimit from 'fastify-rate-limit';
import rateLimit from 'express-rate-limit';
import { CorrelationIdMiddleware } from './middleware/correlation-id.middleware';

// Helmet: Security middleware to set various HTTP headers for security.
// Csurf: CSRF protection middleware.
// fastifyRateLimit: Rate limiting middleware for Fastify.
// Versioning: URI versioning is enabled.
// Logger: Logger middleware for structured logging.
// Global Prefix: Prefix all routes with /api.
// CORS: Enable Cross-Origin Resource Sharing.
// Swagger: API documentation setup with Swagger.
// Database Seeding: Seed the database if the configuration is active.
// Validation Pipe: Apply global DTO validation pipe.
// Global Filters and Middlewares: Apply global exception filters and correlation ID middleware.
// fastifyStatic: This plugin is used to serve static files.
// root: The directory from which static assets will be served.
// prefix: The URL prefix under which the static assets will be served. For example, if you set it to /public/, then a file located at public/example.jpg will be accessible at http://yourdomain.com/public/example.jpg.

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Serve static assets public access
  // app.register(fastifyStatic, {
  //   root: join(__dirname, '..', 'public'),
  //   prefix: '/public/', // optional: default '/'
  // });

  const appConfig = app.get(AppConfigService);

  // Security middlewares
  app.use(helmet());
  app.use(csurf());

  // Register fastify-rate-limit
  // app.register(fastifyRateLimit, {
  //   max: 100,
  //   timeWindow: '15 minutes',
  // });
  
 // Register express-rate-limit
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

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

  await app.listen(appConfig.appPort);
}
bootstrap();
