import { Controller, Get, Post, Body, Patch, Scope, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiOperation, ApiParam, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { CamposService } from './campos.service';
import { CreateCampoDto } from './dto/create-campo.dto';
import { UpdateCampoDto } from './dto/update-campo.dto';

import { campos } from '../mocks/campos.mock';
import { request } from 'src/mocks/mock'

@Controller({
  path: 'campos',
  scope: Scope.REQUEST,
})
@ApiTags('campos')
export class CamposController {
  constructor(private readonly camposService: CamposService) {}

  @ApiOperation({ summary: 'Ingresar campos' })
  @ApiBody({
    type: CreateCampoDto,
    description: "Ingresar campos.",
    examples: {
        a: {
            summary: "Mock Ingresar variedad de prueba.",
            description: "Mock para hacer pruebas de integracion",
            value: request
        },
        b: {
            summary: "Respuesta ingresar a ingresar variedad",
            description: "Mock con contenido en base64",
            value: campos
        },
      //   c: {
      //     summary: "Respuesta ingresar solicitud de documentos",
      //     description: "Mock con respuesta del servicio",
      //     value: responseIngresarDocumentosMock
      // }
    }
  })
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
