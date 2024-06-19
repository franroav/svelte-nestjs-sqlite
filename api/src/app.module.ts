import { Module, MiddlewareConsumer, NestModule} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController, UploadController } from './app.controller';
import { AppService } from './app.service';
import { FrutasModule } from './modules/frutas/frutas.module';
import { CosechasModule } from './modules/cosechas/cosechas.module';
import { AgricultoresModule } from './modules/agricultores/agricultores.module';
import { ClientesModule } from './modules/clientes/clientes.module';
import { dataBaseConfig } from './database/database.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { VariedadesModule } from './modules/variedades/variedades.module';
import { CamposModule } from './modules/campos/campos.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { CsvModule } from 'nest-csv-parser';
import { MulterModule } from '@nestjs/platform-express';
import { AgricultoresService } from './modules/agricultores/agricultores.service';
import { AppConfigService } from './config/configuration.service';
import { AppConfigModule } from './config/config-nestjs.module';
import { CustomCacheInterceptor } from './interceptor/cache.interceptor';
import { CacheModule } from '@nestjs/cache-manager';
import { CorrelationIdMiddleware } from './middleware/correlation-id.middleware';

@Module({
  imports: [
    AppConfigModule,
    LoggerModule.forRoot(),
    FrutasModule,
    VariedadesModule,
    CosechasModule,
    AgricultoresModule,
    CamposModule,
    ClientesModule,
    SequelizeModule.forRoot(dataBaseConfig),
    CsvModule,
    MulterModule,
    CacheModule.register({
      ttl: 5, // seconds
      max: 10, // maximum number of items in cache
    }),
  ],
  controllers: [AppController, UploadController],
  providers: [
    AppService,
    AppConfigService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CustomCacheInterceptor,
    },
  ],
  exports: [AppConfigService],
})
export class AppModule implements NestModule {
  // MIDDLEWARE GLOBAL CONFIGURATION CORRELATION-ID-MIDDLEWARE
  // Unique identifier (correlation ID) to each incoming HTTP request. This unique identifier is then propagated through the request and response headers. The main purpose of this middleware is to facilitate tracking and correlating logs, requests, and responses across different services, making it easier to debug and trace requests through a distributed system.
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorrelationIdMiddleware)
      .forRoutes('*'); // Apply to all routes
  }
}