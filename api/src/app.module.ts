import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController, UploadController } from './app.controller';
import { AppService } from './app.service';
import { FrutasModule } from './frutas/frutas.module';
import { CosechasModule } from './cosechas/cosechas.module';
import { AgricultoresModule } from './agricultores/agricultores.module';
import { ClientesModule } from './clientes/clientes.module';
import { dataBaseConfig } from './database/database.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { VariedadesModule } from './variedades/variedades.module';
import { CamposModule } from './campos/campos.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { CsvModule } from 'nest-csv-parser';
import { MulterModule } from '@nestjs/platform-express';
import { AgricultoresService } from './agricultores/agricultores.service';
import { AppConfigService } from './config/configuration.service';
import { AppConfigModule } from './config/config-nestjs.module';
import { CustomCacheInterceptor } from './interceptor/cache.interceptor';
import { CacheModule } from '@nestjs/cache-manager';

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
export class AppModule {}