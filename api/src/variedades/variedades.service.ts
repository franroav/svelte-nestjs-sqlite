import { Injectable } from '@nestjs/common';
import { CreateVariedadeDto } from './dto/create-variedade.dto';
import { UpdateVariedadeDto } from './dto/update-variedade.dto';
import { Variedad } from './entities/variedade.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class VariedadesService {
  constructor(
    @InjectModel(Variedad)
    private variedadeRepository: typeof Variedad,
  ) {}

  create(createVariedadeDto: CreateVariedadeDto) {
    return this.variedadeRepository.create(createVariedadeDto as any);
  }

  findAll() {
    return this.variedadeRepository.findAll();
  }

  findOne(id: number) {
    return this.variedadeRepository.findByPk(id);
  }

  update(id: number, updateVariedadeDto: UpdateVariedadeDto) {
    return this.variedadeRepository.update(updateVariedadeDto as any, { where: { id } });
  }

  remove(id: number) {
    return this.variedadeRepository.destroy({ where: { id } });
  }
}