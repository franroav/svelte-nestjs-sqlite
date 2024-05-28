import { Module } from '@nestjs/common';
import { CamposService } from './campos.service';
import { CamposController } from './campos.controller';
import { Campo } from './entities/campo.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Campo])],
  controllers: [CamposController],
  providers: [CamposService],
})
export class CamposModule {}
