import { Controller, Get, Post, Body, Patch, Scope, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiOperation, ApiParam, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { CosechasService } from './cosechas.service';
import { CreateCosechaDto } from './dto/create-cosecha.dto';
import { UpdateCosechaDto } from './dto/update-cosecha.dto';

import { cosechas } from '../mocks/cosechas.mock';
import { request } from 'src/mocks/mock'

@Controller({
  path: 'cosechas',
  scope: Scope.REQUEST,
})
@ApiTags('cosechas')
export class CosechasController {
  constructor(private readonly cosechasService: CosechasService) {}

  @ApiOperation({ summary: 'Ingresar cosechas' })
  @ApiBody({
    type: CreateCosechaDto,
    description: "Ingresar cosechas.",
    examples: {
        a: {
            summary: "Mock Ingresar variedad de prueba.",
            description: "Mock para hacer pruebas de integracion",
            value: request
        },
        b: {
            summary: "Respuesta ingresar a ingresar variedad",
            description: "Mock con contenido en base64",
            value: cosechas
        },
      //   c: {
      //     summary: "Respuesta ingresar solicitud de documentos",
      //     description: "Mock con respuesta del servicio",
      //     value: responseIngresarDocumentosMock
      // }
    }
  })
  @Post()
  create(@Body() createCosechaDto: CreateCosechaDto) {
    return this.cosechasService.create(createCosechaDto);
  }

  @Get()
  findAll() {
    return this.cosechasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cosechasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCosechaDto: UpdateCosechaDto) {
    return this.cosechasService.update(+id, updateCosechaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cosechasService.remove(+id);
  }
}
