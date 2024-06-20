import { Module } from '@nestjs/common';
import { CamposService } from './campos.service';
import { CamposController } from './campos.controller';
import { Campo } from './entities/campo.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Campo])],
  controllers: [CamposController],
  providers: [CamposService, JwtService],
  exports: [CamposService],
})
export class CamposModule {}
