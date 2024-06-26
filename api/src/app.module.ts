import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, HttpAdapterHost } from '@nestjs/core';
import { AppController, UploadController } from './app.controller';
import { AppService } from './app.service';
import { FrutasModule } from './modules/frutas/frutas.module';
import { CosechasModule } from './modules/cosechas/cosechas.module';
import { AgricultoresModule } from './modules/agricultores/agricultores.module';
import { ClientesModule } from './modules/clientes/clientes.module';
import { dataBaseConfig } from './database/database.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { VariedadesModule } from './modules/variedades/variedades.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrometheusModule } from './modules/prometheus/prometheus.module';
import { CamposModule } from './modules/campos/campos.module';
import { LoggerModule } from 'nestjs-pino';
import { CsvModule } from 'nest-csv-parser';
import { MulterModule } from '@nestjs/platform-express';
import { AppConfigService } from './config/configuration.service';
import { AppConfigModule } from './config/config-nestjs.module';
import { CustomCacheInterceptor } from './interceptor/cache.interceptor';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GlobalExceptionsFilters } from './filters/global-exception.filter';
import { TransactionLogsModule } from './modules/transaction-logs/transaction-logs.module';
// import { CorrelationIdMiddleware } from './middleware/correlation-id.middleware'; // Import correlation Middleware
import { JwtModule } from '@nestjs/jwt';
import { TokenGuard } from './guards/token.guard'; // Import your TokenGuard class
// import { CsrfMiddleware } from './middleware/csrf.middleware'; // Import CsrfMiddleware

@Module({
  imports: [
    ConfigModule.forRoot(),  // Load .env file
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET || 'default_secret',
    //   signOptions: { expiresIn: '60m' },
    // }),
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
    PrometheusModule,
    TransactionLogsModule,
    CacheModule.register({
      ttl: 5, // seconds
      max: 10, // maximum number of items in cache
    }),
    AuthModule,
  ],
  controllers: [AppController, UploadController],
  providers: [
    AppService,
    AppConfigService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CustomCacheInterceptor,
    },
    {
      provide: APP_FILTER,
      useFactory: (httpAdapterHost: HttpAdapterHost) => {
        return new GlobalExceptionsFilters(httpAdapterHost);
      },
      inject: [HttpAdapterHost],
    },
    TokenGuard,
  ],
  exports: [AppConfigService],
})
export class AppModule {}

// export class AppModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(CorrelationIdMiddleware)
//       .forRoutes('*'); // Apply to all routes
//   }
// }

// export class AppModule implements NestModule {
//   // MIDDLEWARE GLOBAL CONFIGURATION CORRELATION-ID-MIDDLEWARE
//   // Unique identifier (correlation ID) to each incoming HTTP request. This unique identifier is then propagated through the request and response headers. The main purpose of this middleware is to facilitate tracking and correlating logs, requests, and responses across different services, making it easier to debug and trace requests through a distributed system.
//   // Apply middleware globally
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(CsrfMiddleware, CorrelationIdMiddleware) // Add CsrfMiddleware here
//       .forRoutes({ path: '*', method: RequestMethod.ALL }); // Apply to all routes and methods
//   }
// }
