import { Module } from '@nestjs/common';
import { CosechasService } from './cosechas.service';
import { CosechasController } from './cosechas.controller';
import { Cosecha } from './entities/cosecha.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Cosecha])],
  controllers: [CosechasController],
  providers: [CosechasService],
})
export class CosechasModule {}
