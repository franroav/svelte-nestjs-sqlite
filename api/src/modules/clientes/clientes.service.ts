import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ClientesService {
  constructor(
    @InjectModel(Cliente)
    private clienteRepository: typeof Cliente,
  ) {}

  
  findByEmail(email: string) {
    return this.clienteRepository.findOne({ where: { email } });
  }


  async create(createClienteDto: CreateClienteDto) {
    const exists = await this.findByEmail(createClienteDto['email']);
    if (exists) {
      throw new HttpException('Email already exists for Cliente', HttpStatus.CONFLICT);
    }
    return this.clienteRepository.create(createClienteDto as any);
  }

  findAll() {
    return this.clienteRepository.findAll();
  }

  findOne(id: number) {
    return this.clienteRepository.findByPk(id);
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return this.clienteRepository.update(updateClienteDto as any, { where: { id } });
  }

  remove(id: number) {
    return this.clienteRepository.destroy({ where: { id } });
  }
}