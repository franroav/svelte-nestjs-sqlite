import { Module } from '@nestjs/common';
import { VariedadesService } from './variedades.service';
import { VariedadesController } from './variedades.controller';
import { Variedad } from './entities/variedade.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { TransactionLogsService } from '../transaction-logs/services/transaction-logs.service';
@Module({
  imports: [SequelizeModule.forFeature([Variedad]),     JwtModule.register({
    secret: process.env.JWT_SECRET || 'default_secret',
    signOptions: { expiresIn: '60m' },
  })],
  controllers: [VariedadesController],
  providers: [VariedadesService, JwtService, TransactionLogsService],
  exports: [VariedadesService],
})
export class VariedadesModule {}
