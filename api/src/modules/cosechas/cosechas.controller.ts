import { Controller, Get, Post, Body, Patch, Scope, Param, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CosechasService } from './cosechas.service';
import { CreateCosechaDto } from './dto/request/create-cosecha.dto';
import { UpdateCosechaDto } from './dto/request/update-cosecha.dto';
import { ResponseCosechaDto } from './dto/response/response-cosecha.dto';
import { CustomCacheInterceptor } from '../../interceptor/cache.interceptor';
import { TokenGuard } from '../../guards/token.guard';

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
        summary: "Mock Ingresar cosecha de prueba.",
        description: "Mock para hacer pruebas de integracion en controlador de cosechas",
        value: {
          /* your example data */
        },
      },
      b: {
        summary: "Respuesta ingresar a ingresar cosecha",
        description: "Mock con contenido en base64",
        value: {
          /* your example data */
        },
      },
    }
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  @Post()
  create(@Body() createCosechaDto: CreateCosechaDto) {
    return this.cosechasService.create(createCosechaDto);
  }

  
  @ApiResponse({
    status: 201,
    type: ResponseCosechaDto,
  })

  @Get()
  @ApiOperation({ summary: 'Respuesta cosechas' })
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  @UseInterceptors(CustomCacheInterceptor)
  async findAll(): Promise<ResponseCosechaDto[]> {
    return this.cosechasService.findAll();
  }


  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  findOne(@Param('id') id: string) {
    return this.cosechasService.findOne(+id);
  }
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCosechaDto: UpdateCosechaDto) {
    return this.cosechasService.update(+id, updateCosechaDto);
  }
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cosechasService.remove(+id);
  }
}
