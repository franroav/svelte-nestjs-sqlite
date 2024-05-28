import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_FILTER } from '@nestjs/core';
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

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    FrutasModule,
    VariedadesModule,
    CosechasModule,
    AgricultoresModule,
    CamposModule,
    ClientesModule,
    SequelizeModule.forRoot(dataBaseConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
