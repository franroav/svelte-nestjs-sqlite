import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  findByName(nombre: string) {
    return this.variedadeRepository.findOne({ where: { nombre} });
  }

  async create(createVariedadeDto: CreateVariedadeDto) {
    const exists = await this.findByName(createVariedadeDto['nombre']);
    if (exists) {
      throw new HttpException('Variedad with this name already exists', HttpStatus.CONFLICT);
    }
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