import { PartialType } from '@nestjs/mapped-types';
import { CreateAgricultoreDto } from './create-agricultore.dto';

export class UpdateAgricultoreDto extends PartialType(CreateAgricultoreDto) {}
