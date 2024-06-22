import { IsString, IsInt } from 'class-validator';

export class CreateVariedadeDto {
    @IsString()
    nombre: string;
  
    @IsInt()
    frutaId: number;
  }
