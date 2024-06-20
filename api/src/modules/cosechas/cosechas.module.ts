import { Module } from '@nestjs/common';
import { CosechasService } from './cosechas.service';
import { CosechasController } from './cosechas.controller';
import { Cosecha } from './entities/cosecha.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Cosecha]), CacheModule.register()],
  controllers: [CosechasController],
  providers: [CosechasService, JwtService],
})
export class CosechasModule {}
