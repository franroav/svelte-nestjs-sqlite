import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { Cliente } from './entities/cliente.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Cliente])],
  controllers: [ClientesController],
  providers: [ClientesService, JwtService],
  exports: [ClientesService],
})
export class ClientesModule {}
