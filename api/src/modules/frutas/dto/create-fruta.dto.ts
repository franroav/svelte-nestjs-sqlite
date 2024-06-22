import { IsString } from 'class-validator';
export class CreateFrutaDto  {
    @IsString()
    nombre: string;
  }
