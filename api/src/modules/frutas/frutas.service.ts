
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFrutaDto } from './dto/create-fruta.dto';
import { UpdateFrutaDto } from './dto/update-fruta.dto';
import { Fruta } from './entities/fruta.entity';
import { InjectModel } from '@nestjs/sequelize';
import { AtributoLogEntity } from '../transaction-logs/entities/atributo-log.entity';
import { TransactionLogsService } from '../transaction-logs/services/transaction-logs.service';

@Injectable()
export class FrutasService {
  
  constructor(
    @InjectModel(Fruta)
    private frutaRepository: typeof Fruta,
    private readonly transactionLogsService: TransactionLogsService,
  ) {}

  private readonly CODIGO_SERVICIO: string = 'X';
  private readonly SERVICIO: string = `Servicio - ${FrutasService.name}`;

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
    const atributoLogEntity = new AtributoLogEntity();
    atributoLogEntity.uuid = this.transactionLogsService.generateUUID();
    atributoLogEntity.codigo = this.CODIGO_SERVICIO;
    atributoLogEntity.titulo = 'consulta_fruta';
    atributoLogEntity.lugar = `${this.SERVICIO} - Método Listar Frutas()`;
    atributoLogEntity.inicio = Date.now();
    atributoLogEntity.respuesta = `Consulta de listar Frutas obtenidas correctamente - Status: ${HttpStatus.OK}`;
    atributoLogEntity.estado = '1';
    this.transactionLogsService.transactionLogs(atributoLogEntity);
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