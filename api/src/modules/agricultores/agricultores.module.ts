import { Module } from '@nestjs/common';
import { AgricultoresService } from './agricultores.service';
import { AgricultoresController } from './agricultores.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Agricultor } from './entities/agricultore.entity';

@Module({
  imports: [SequelizeModule.forFeature([Agricultor])],
  controllers: [AgricultoresController],
  providers: [AgricultoresService],
  exports: [AgricultoresService],
})
export class AgricultoresModule {}