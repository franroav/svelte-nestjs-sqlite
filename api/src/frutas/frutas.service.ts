
import { Injectable } from '@nestjs/common';
import { CreateFrutaDto } from './dto/create-fruta.dto';
import { UpdateFrutaDto } from './dto/update-fruta.dto';
import { Fruta } from './entities/fruta.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class FrutasService {
  constructor(
    @InjectModel(Fruta)
    private frutaRepository: typeof Fruta,
  ) {}

  create(createFrutaDto: CreateFrutaDto) {
    
    return this.frutaRepository.create(createFrutaDto as any);
  }

  findAll() {
    return this.frutaRepository.findAll();
  }

  findOne(id: number) {
    return this.frutaRepository.findByPk(id);
  }

  update(id: number, updateFrutaDto: UpdateFrutaDto) {
    return this.frutaRepository.update(updateFrutaDto as any, { where: { id } });
  }

  remove(id: number) {
    return this.frutaRepository.destroy({ where: { id } });
  }
}