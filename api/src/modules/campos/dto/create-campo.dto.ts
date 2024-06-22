import { IsString, IsInt } from 'class-validator';

export class CreateCampoDto {
    @IsString()
    nombre: string;
  
    @IsString()
    ubicacion: string;
  
    @IsInt()
    agricultorId: number;
  }