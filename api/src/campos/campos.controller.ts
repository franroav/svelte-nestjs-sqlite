import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CamposService } from './campos.service';
import { CreateCampoDto } from './dto/create-campo.dto';
import { UpdateCampoDto } from './dto/update-campo.dto';

@Controller('campos')
export class CamposController {
  constructor(private readonly camposService: CamposService) {}

  @Post()
  create(@Body() createCampoDto: CreateCampoDto) {
    return this.camposService.create(createCampoDto);
  }

  @Get()
  findAll() {
    return this.camposService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.camposService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampoDto: UpdateCampoDto) {
    return this.camposService.update(+id, updateCampoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.camposService.remove(+id);
  }
}
