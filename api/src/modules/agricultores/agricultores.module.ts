import { Module } from '@nestjs/common';
import { AgricultoresService } from './agricultores.service';
import { AgricultoresController } from './agricultores.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Agricultor } from './entities/agricultore.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Agricultor])],
  controllers: [AgricultoresController],
  providers: [AgricultoresService, JwtService],
  exports: [AgricultoresService],
})
export class AgricultoresModule {}