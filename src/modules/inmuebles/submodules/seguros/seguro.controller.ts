import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { SegurosService } from './seguro.service';
import { CreateSeguroDto } from './dto/create-seguro.dto';
import { UpdateSeguroDto } from './dto/update-seguro.dto';
import { Seguro } from './seguro.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Seguros')
@Controller('inmuebles/:inmuebleId/seguros')
export class SegurosController {
  constructor(private readonly segurosService: SegurosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un seguro para un inmueble' })
  create(
    @Param('inmuebleId', ParseIntPipe) inmuebleId: number,
    @Body() createSeguroDto: CreateSeguroDto,
  ): Promise<Seguro | null> {
    return this.segurosService.create(inmuebleId, createSeguroDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar seguros de un inmueble' })
  findAll(
    @Param('inmuebleId', ParseIntPipe) inmuebleId: number,
  ): Promise<Seguro[]> {
    return this.segurosService.findAll(inmuebleId);
  }

  @Patch(':seguroId')
  @ApiOperation({ summary: 'Actualizar un seguro de un inmueble' })
  async update(
    @Param('seguroId', ParseIntPipe) seguroId: number,
    @Body() updateSeguroDto: UpdateSeguroDto,
  ): Promise<Seguro> {
    const seguro = await this.segurosService.update(seguroId, updateSeguroDto);
    if (!seguro) throw new NotFoundException();
    return seguro;
  }

  @Delete(':seguroId')
  @ApiOperation({ summary: 'Eliminar un seguro de un inmueble' })
  async remove(
    @Param('seguroId', ParseIntPipe) seguroId: number,
  ): Promise<Seguro> {
    const seguro = await this.segurosService.remove(seguroId);
    if (!seguro) throw new NotFoundException();
    return seguro;
  }
}