import { Injectable } from '@nestjs/common';
import { CreateCosechaDto } from './dto/request/create-cosecha.dto';
import { UpdateCosechaDto } from './dto/request/update-cosecha.dto';
import { Cosecha } from './entities/cosecha.entity';
import { InjectModel } from '@nestjs/sequelize';
import { ResponseCosechaDto } from './dto/response/response-cosecha.dto';

@Injectable()
export class CosechasService {
  constructor(
    @InjectModel(Cosecha)
    private cosechaRepository: typeof Cosecha,
  ) {}

  // create(createCosechaDto: CreateCosechaDto) {
  //   return this.cosechaRepository.create(createCosechaDto as any);
  // }

  async create(createCosechaDto: CreateCosechaDto): Promise<Cosecha> {
    const {
      frutaId,
      variedadeId,
      agricultorId,
      campoId,
      fechaCosecha,
      cantidad,
    } = createCosechaDto;

    // Crear la nueva cosecha en la base de datos
    const cosecha = await this.cosechaRepository.create({
      frutaId,
      variedadeId,
      agricultorId,
      campoId,
      fechaCosecha,
      cantidad,
    });

    return cosecha;
  }

  async findAll(): Promise<ResponseCosechaDto[]> {
    const cosechas = await this.cosechaRepository.findAll();
    return cosechas.map((cosecha) => ({
      id: cosecha.id,
      frutaId: cosecha.frutaId,
      variedadeId: cosecha.variedadeId,
      agricultorId: cosecha.agricultorId,
      campoId: cosecha.campoId,
      fechaCosecha: cosecha.fechaCosecha,
      cantidad: cosecha.cantidad,
      createdAt: cosecha.createdAt,
      updatedAt: cosecha.updatedAt,
    }));
  }

  findOne(id: number) {
    return this.cosechaRepository.findByPk(id);
  }

  update(id: number, updateCosechaDto: UpdateCosechaDto) {
    return this.cosechaRepository.update(updateCosechaDto as any, {
      where: { id },
    });
  }

  remove(id: number) {
    return this.cosechaRepository.destroy({ where: { id } });
  }
}
