// create-cosecha.dto.ts
import { IsInt, IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateCosechaDto {
  @IsInt()
  frutaId: number;

  @IsInt()
  variedadeId: number;

  @IsInt()
  agricultorId: number;

  @IsInt()
  campoId: number;

  @IsDate()
  @Type(() => Date)
  fechaCosecha: Date;

  @IsNumber()
  cantidad: number;
}
