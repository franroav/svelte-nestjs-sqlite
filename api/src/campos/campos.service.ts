import { Injectable } from '@nestjs/common';
import { CreateCampoDto } from './dto/create-campo.dto';
import { UpdateCampoDto } from './dto/update-campo.dto';
import { Campo } from './entities/campo.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CamposService {
  constructor(
    @InjectModel(Campo)
    private campoRepository: typeof Campo,
  ) {}

  create(createCampoDto: CreateCampoDto) {
    return this.campoRepository.create(createCampoDto as any);
  }

  findAll() {
    return this.campoRepository.findAll();
  }

  findOne(id: number) {
    return this.campoRepository.findByPk(id);
  }

  update(id: number, updateCampoDto: UpdateCampoDto) {
    return this.campoRepository.update(updateCampoDto as any, { where: { id } });
  }

  remove(id: number) {
    return this.campoRepository.destroy({ where: { id } });
  }
}