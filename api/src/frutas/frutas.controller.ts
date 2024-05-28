import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FrutasService } from './frutas.service';
import { CreateFrutaDto } from './dto/create-fruta.dto';
import { UpdateFrutaDto } from './dto/update-fruta.dto';

@Controller('frutas')
export class FrutasController {
  constructor(private readonly frutasService: FrutasService) {}

  @Post()
  create(@Body() createFrutaDto: CreateFrutaDto) {
    return this.frutasService.create(createFrutaDto);
  }

  @Get()
  findAll() {
    return this.frutasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.frutasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFrutaDto: UpdateFrutaDto) {
    return this.frutasService.update(+id, updateFrutaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.frutasService.remove(+id);
  }
}
