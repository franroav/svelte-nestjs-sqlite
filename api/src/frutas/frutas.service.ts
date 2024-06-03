
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  findByName(nombre: string) {
    return this.frutaRepository.findOne({ where: { nombre } });
  }

  async create(createFrutaDto: CreateFrutaDto) {
    const exists = await this.findByName(createFrutaDto['nombre']);
    if (exists) {
      throw new HttpException('Fruta with this name already exists', HttpStatus.CONFLICT);
    }
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