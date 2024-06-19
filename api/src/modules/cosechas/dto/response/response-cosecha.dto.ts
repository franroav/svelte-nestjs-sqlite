// response-cosecha.dto.ts
import { IsInt, IsDate, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ResponseCosechaDto {
  @IsInt()
  id: number;

  @IsInt()
  frutaId: number;

  @IsOptional()
  @IsInt()
  variedadeId: number | null;

  @IsOptional()
  @IsInt()
  agricultorId: number | null;

  @IsInt()
  campoId: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fechaCosecha: Date | null;

  @IsOptional()
  @IsNumber()
  cantidad: number | null;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @IsDate()
  @Type(() => Date)
  updatedAt: Date;
}