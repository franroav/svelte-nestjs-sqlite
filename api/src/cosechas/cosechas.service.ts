import { Injectable } from '@nestjs/common';
import { CreateCosechaDto } from './dto/create-cosecha.dto';
import { UpdateCosechaDto } from './dto/update-cosecha.dto';
import { Cosecha } from './entities/cosecha.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CosechasService {
  constructor(
    @InjectModel(Cosecha)
    private cosechaRepository: typeof Cosecha,
  ) {}

  create(createCosechaDto: CreateCosechaDto) {
    return this.cosechaRepository.create(createCosechaDto as any);
  }

  findAll() {
    return this.cosechaRepository.findAll();
  }

  findOne(id: number) {
    return this.cosechaRepository.findByPk(id);
  }

  update(id: number, updateCosechaDto: UpdateCosechaDto) {
    return this.cosechaRepository.update(updateCosechaDto as any, { where: { id } });
  }

  remove(id: number) {
    return this.cosechaRepository.destroy({ where: { id } });
  }
}