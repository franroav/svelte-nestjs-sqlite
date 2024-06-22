import { IsString, IsEmail } from 'class-validator';
export class CreateAgricultoreDto {
    @IsString()
    nombre: string;
  
    @IsEmail()
    email: string;
  }
