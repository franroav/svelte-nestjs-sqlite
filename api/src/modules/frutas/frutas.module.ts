import { Module } from '@nestjs/common';
import { FrutasService } from './frutas.service';
import { FrutasController } from './frutas.controller';
import { Fruta } from './entities/fruta.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { TransactionLogsService } from '../transaction-logs/services/transaction-logs.service';

@Module({
  imports: [SequelizeModule.forFeature([Fruta]),     JwtModule.register({
    secret: process.env.JWT_SECRET || 'default_secret',
    signOptions: { expiresIn: '60m' },
  })],
  controllers: [FrutasController],
  providers: [FrutasService, JwtService, TransactionLogsService],
  exports: [FrutasService],
})
export class FrutasModule {}
