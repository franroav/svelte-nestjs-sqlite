import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';
import { IsString, IsEmail, IsOptional } from 'class-validator';


export class UpdateClienteDto extends PartialType(CreateClienteDto) {
    @IsOptional()
    @IsString()
    nombre?: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  }
