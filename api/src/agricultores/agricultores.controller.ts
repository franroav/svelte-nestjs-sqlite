import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgricultoresService } from './agricultores.service';
import { CreateAgricultoreDto } from './dto/create-agricultore.dto';
import { UpdateAgricultoreDto } from './dto/update-agricultore.dto';

@Controller('agricultores')
export class AgricultoresController {
  constructor(private readonly agricultoresService: AgricultoresService) {}

  @Post()
  create(@Body() createAgricultoreDto: CreateAgricultoreDto) {
    return this.agricultoresService.create(createAgricultoreDto);
  }

  @Get()
  findAll() {
    return this.agricultoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agricultoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgricultoreDto: UpdateAgricultoreDto) {
    return this.agricultoresService.update(+id, updateAgricultoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agricultoresService.remove(+id);
  }
}
