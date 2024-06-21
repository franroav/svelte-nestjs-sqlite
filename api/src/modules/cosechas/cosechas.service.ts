import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCosechaDto } from './dto/request/create-cosecha.dto';
import { UpdateCosechaDto } from './dto/request/update-cosecha.dto';
import { Cosecha } from './entities/cosecha.entity';
import { InjectModel } from '@nestjs/sequelize';
import { ResponseCosechaDto } from './dto/response/response-cosecha.dto';
import { AtributoLogEntity } from '../transaction-logs/entities/atributo-log.entity';
import { TransactionLogsService } from '../transaction-logs/services/transaction-logs.service';


@Injectable()
export class CosechasService {
  constructor(
    @InjectModel(Cosecha)
    private cosechaRepository: typeof Cosecha,
    private readonly transactionLogsService: TransactionLogsService,
  ) {}

  private readonly CODIGO_SERVICIO: string = 'X';
  private readonly SERVICIO: string = `Servicio - ${CosechasService.name}`;

  // create(createCosechaDto: CreateCosechaDto) {
  //   return this.cosechaRepository.create(createCosechaDto as any);
  // }

  async create(createCosechaDto: CreateCosechaDto): Promise<Cosecha> {
    const atributoLogEntity = new AtributoLogEntity();
    atributoLogEntity.uuid = this.transactionLogsService.generateUUID();
    atributoLogEntity.codigo = this.CODIGO_SERVICIO;
    atributoLogEntity.titulo = 'crear_cosecha';
    atributoLogEntity.lugar = `${this.SERVICIO} - Método Crear cosecha()`;
    atributoLogEntity.inicio = Date.now();

    try {
      atributoLogEntity.respuesta = `Respuesta Controlada: La cosecha ha sido creada correctamente - Status: ${HttpStatus.OK}`;
      atributoLogEntity.estado = '1';
      this.transactionLogsService.transactionLogs(atributoLogEntity);
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
    } catch (error) {
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      atributoLogEntity.respuesta = `Error: ${error.message} - Status:${status}`;
      atributoLogEntity.estado = '0';
      atributoLogEntity.response = error;
      this.transactionLogsService.transactionLogs(atributoLogEntity);
      throw new HttpException(error.message, status);
    }

  }

  async findAll(): Promise<ResponseCosechaDto[]> {
    const atributoLogEntity = new AtributoLogEntity();
    atributoLogEntity.uuid = this.transactionLogsService.generateUUID();
    atributoLogEntity.codigo = this.CODIGO_SERVICIO;
    atributoLogEntity.titulo = 'listar_cosechas';
    atributoLogEntity.lugar = `${this.SERVICIO} - Método Listar cosechas()`;
    atributoLogEntity.inicio = Date.now();

    try {
      atributoLogEntity.respuesta = `Consulta de listar cosechas obtenidas correctamente - Status: ${HttpStatus.OK}`;
      atributoLogEntity.estado = '1';
      this.transactionLogsService.transactionLogs(atributoLogEntity);
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
    } catch (error) {
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      atributoLogEntity.respuesta = `Error: ${error.message} - Status:${status}`;
      atributoLogEntity.estado = '0';
      atributoLogEntity.response = error;
      this.transactionLogsService.transactionLogs(atributoLogEntity);
      throw new HttpException(error.message, status);
    }

  }

  findOne(id: number) {
    const atributoLogEntity = new AtributoLogEntity();
    atributoLogEntity.uuid = this.transactionLogsService.generateUUID();
    atributoLogEntity.codigo = this.CODIGO_SERVICIO;
    atributoLogEntity.titulo = 'consulta_cosecha';
    atributoLogEntity.lugar = `${this.SERVICIO} - Método buscar cosecha()`;
    atributoLogEntity.inicio = Date.now();

    try {
      atributoLogEntity.respuesta = `Consulta de cosecha ${id} obtenida correctamente - Status: ${HttpStatus.OK}`;
      atributoLogEntity.estado = '1';
      this.transactionLogsService.transactionLogs(atributoLogEntity);
      return this.cosechaRepository.findByPk(id);
    } catch (error) {
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      atributoLogEntity.respuesta = `Error: ${error.message} - Status:${status}`;
      atributoLogEntity.estado = '0';
      atributoLogEntity.response = error;
      this.transactionLogsService.transactionLogs(atributoLogEntity);
      throw new HttpException(error.message, status);
    }
    
  }

  update(id: number, updateCosechaDto: UpdateCosechaDto) {
    const atributoLogEntity = new AtributoLogEntity();
    atributoLogEntity.uuid = this.transactionLogsService.generateUUID();
    atributoLogEntity.codigo = this.CODIGO_SERVICIO;
    atributoLogEntity.titulo = 'actualizar_cosecha';
    atributoLogEntity.lugar = `${this.SERVICIO} - Método actualizar cosecha()`;
    atributoLogEntity.inicio = Date.now();

    try {
      atributoLogEntity.respuesta = `Actualizar cosecha ${id} guardada correctamente - Status: ${HttpStatus.OK}`;
      atributoLogEntity.estado = '1';
      this.transactionLogsService.transactionLogs(atributoLogEntity);
      return this.cosechaRepository.update(updateCosechaDto as any, {
        where: { id },
      });
    } catch (error) {
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      atributoLogEntity.respuesta = `Error: ${error.message} - Status:${status}`;
      atributoLogEntity.estado = '0';
      atributoLogEntity.response = error;
      this.transactionLogsService.transactionLogs(atributoLogEntity);
      throw new HttpException(error.message, status);
    }

  }

  remove(id: number) {
    const atributoLogEntity = new AtributoLogEntity();
    atributoLogEntity.uuid = this.transactionLogsService.generateUUID();
    atributoLogEntity.codigo = this.CODIGO_SERVICIO;
    atributoLogEntity.titulo = 'eliminar_cosecha';
    atributoLogEntity.lugar = `${this.SERVICIO} - Método eliminar cosecha()`;
    atributoLogEntity.inicio = Date.now();

    try {
      atributoLogEntity.respuesta = `La cosecha ${id} ha sido eliminada correctamente - Status: ${HttpStatus.OK}`;
      atributoLogEntity.estado = '1';
      this.transactionLogsService.transactionLogs(atributoLogEntity);
      return this.cosechaRepository.destroy({ where: { id } });
    } catch (error) {
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      atributoLogEntity.respuesta = `Error: ${error.message} - Status:${status}`;
      atributoLogEntity.estado = '0';
      atributoLogEntity.response = error;
      this.transactionLogsService.transactionLogs(atributoLogEntity);
      throw new HttpException(error.message, status);
    }
    
  }
}
