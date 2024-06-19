import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAgricultoreDto } from './dto/create-agricultore.dto';
import { UpdateAgricultoreDto } from './dto/update-agricultore.dto';
import { Agricultor } from './entities/agricultore.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AgricultoresService {
  constructor(
    @InjectModel(Agricultor)
    private agricultorRepository: typeof Agricultor,
  ) {}

  findByEmail(email: string) {
    return this.agricultorRepository.findOne({ where: { email } });
  }

  async create(createAgricultorDto: CreateAgricultoreDto) {
    const exists = await this.findByEmail(createAgricultorDto['email']);
    if (exists) {
      throw new HttpException('Email already exists for Agricultor', HttpStatus.CONFLICT);
    }
    return this.agricultorRepository.create(createAgricultorDto as any);
  }

  findAll() {
    return this.agricultorRepository.findAll();
  }

  findOne(id: number) {
    return this.agricultorRepository.findByPk(id);
  }

  update(id: number, updateAgricultorDto: UpdateAgricultoreDto) {
    return this.agricultorRepository.update(updateAgricultorDto as any, { where: { id } });
  }

  remove(id: number) {
    return this.agricultorRepository.destroy({ where: { id } });
  }
}