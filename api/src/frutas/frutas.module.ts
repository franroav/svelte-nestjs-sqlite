import { Module } from '@nestjs/common';
import { FrutasService } from './frutas.service';
import { FrutasController } from './frutas.controller';
import { Fruta } from './entities/fruta.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Fruta])],
  controllers: [FrutasController],
  providers: [FrutasService],
})
export class FrutasModule {}
