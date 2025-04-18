import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { IncidenciaService } from './incidencia.service';
import { CreateIncidenciaDto } from './dto/create-incidencia.dto';
import { UpdateIncidenciaDto } from './dto/update-incidencia.dto';
import { Incidencia } from './incidencia.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Incidencias')
@Controller('incidencias')
export class IncidenciaController {
  constructor(private readonly incidenciaService: IncidenciaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva incidencia' })
  create(@Body() dto: CreateIncidenciaDto): Promise<Incidencia> {
    return this.incidenciaService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las incidencias' })
  findAll(): Promise<Incidencia[]> {
    return this.incidenciaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una incidencia por ID' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Incidencia> {
    const incidencia = await this.incidenciaService.findOne(id);
    if (!incidencia) throw new NotFoundException();
    return incidencia;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar proveedor avisado en una incidencia' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateIncidenciaDto,
  ): Promise<Incidencia> {
    const updated = await this.incidenciaService.update(id, dto);
    if (!updated) throw new NotFoundException();
    return updated;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una incidencia' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Incidencia> {
    const removed = await this.incidenciaService.remove(id);
    if (!removed) throw new NotFoundException();
    return removed;
  }
}
