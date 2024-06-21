import { Controller, Get, Post, Body, Patch, Scope, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiOperation, ApiParam, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { VariedadesService } from './variedades.service';
import { CreateVariedadeDto } from './dto/create-variedade.dto';
import { UpdateVariedadeDto } from './dto/update-variedade.dto';

import { variedades } from 'src/mocks/variedades.mock';
import { request } from 'src/mocks/mock'
import { TokenGuard } from '../../guards/token.guard';

@Controller({
  path: 'variedades',
  scope: Scope.REQUEST,
})
@ApiTags('variedades')
export class VariedadesController {
  constructor(private readonly variedadesService: VariedadesService) {}

  @ApiOperation({ summary: 'Ingresar Varidades' })
  @ApiBody({
    type: CreateVariedadeDto,
    description: "Ingresar variedades.",
    examples: {
        a: {
            summary: "Mock Ingresar variedad de prueba.",
            description: "Mock para hacer pruebas de integracion",
            value: request
        },
        b: {
            summary: "Respuesta ingresar a ingresar variedad",
            description: "Mock con contenido en base64",
            value: variedades
        },
      //   c: {
      //     summary: "Respuesta ingresar solicitud de documentos",
      //     description: "Mock con respuesta del servicio",
      //     value: responseIngresarDocumentosMock
      // }
    }
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  @Post()
  create(@Body() createVariedadeDto: CreateVariedadeDto) {
    return this.variedadesService.create(createVariedadeDto);
  }

  @ApiResponse({
    status: 201,
    type: variedades,
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  @Get()
  findAll() {
    return this.variedadesService.findAll();
  }
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variedadesService.findOne(+id);
  }
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVariedadeDto: UpdateVariedadeDto) {
    return this.variedadesService.update(+id, updateVariedadeDto);
  }
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variedadesService.remove(+id);
  }
}
