import { Module } from '@nestjs/common';
import { AgricultoresService } from './agricultores.service';
import { AgricultoresController } from './agricultores.controller';
import { Agricultor } from './entities/agricultore.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Agricultor])],
  controllers: [AgricultoresController],
  providers: [AgricultoresService],
})
export class AgricultoresModule {}
