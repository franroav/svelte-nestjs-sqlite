import { Controller, Get, Post, Body, Patch, Scope, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiOperation, ApiParam, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { FrutasService } from './frutas.service';
import { CreateFrutaDto } from './dto/create-fruta.dto';
import { UpdateFrutaDto } from './dto/update-fruta.dto';

import { frutas } from '../../mocks/frutas.mock';
import { request } from 'src/mocks/mock'
@Controller({
  path: 'frutas',
  scope: Scope.REQUEST,
})
@ApiTags('frutas')
export class FrutasController {
  constructor(private readonly frutasService: FrutasService) {}

  @ApiOperation({ summary: 'Ingresar Frutas' })
  @ApiBody({
    type: CreateFrutaDto,
    description: "Ingresar frutas.",
    examples: {
        a: {
            summary: "Mock Ingresar variedad de prueba.",
            description: "Mock para hacer pruebas de integracion",
            value: request
        },
        b: {
            summary: "Respuesta ingresar a ingresar variedad",
            description: "Mock con contenido en base64",
            value: frutas
        },
    }
  })
  @Post()
  create(@Body() createFrutaDto: CreateFrutaDto) {
    return this.frutasService.create(createFrutaDto);
  }

  // @ApiResponse({
  //   status: 201,
  //   type: ApiResponseFrutas,
  // })
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
