import { Module } from '@nestjs/common';
import { VariedadesService } from './variedades.service';
import { VariedadesController } from './variedades.controller';
import { Variedad } from './entities/variedade.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [SequelizeModule.forFeature([Variedad])],
  controllers: [VariedadesController],
  providers: [VariedadesService, JwtService],
  exports: [VariedadesService],
})
export class VariedadesModule {}
