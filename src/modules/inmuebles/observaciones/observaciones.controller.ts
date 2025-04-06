import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ObservacionService } from './observaciones.service';
import { CreateObservacionDto } from '../dto/create-observacion.dto';
import { UpdateObservacionDto } from '../dto/update-observacion.dto';
import { Observacion } from '../entities/observacion.entity';

@Controller('inmuebles/:inmuebleId/observaciones')
export class ObservacionController {
  constructor(private readonly observacionService: ObservacionService) {}

  @Post()
  async create(
    @Param('inmuebleId') inmuebleId: number,
    @Body() createObservacionDto: CreateObservacionDto,
  ): Promise<Observacion> {
    return this.observacionService.create(inmuebleId, createObservacionDto);
  }

  @Get()
  async findAll(@Param('inmuebleId') inmuebleId: number): Promise<Observacion[]> {
    return this.observacionService.findAll(inmuebleId);
  }

  @Get(':observacionId')
  async findOne(
    @Param('inmuebleId') inmuebleId: number,
    @Param('observacionId') observacionId: number,
  ): Promise<Observacion | null> {
    return this.observacionService.findOne(inmuebleId, observacionId);
  }

  @Patch(':observacionId')
  async update(
    @Param('inmuebleId') inmuebleId: number,
    @Param('observacionId') observacionId: number,
    @Body() updateObservacionDto: UpdateObservacionDto,
  ): Promise<Observacion | null> {
    return this.observacionService.update(inmuebleId, observacionId, updateObservacionDto);
  }

  @Delete(':observacionId')
  async remove(
    @Param('inmuebleId') inmuebleId: number,
    @Param('observacionId') observacionId: number,
  ): Promise<boolean> {
    return this.observacionService.remove(inmuebleId, observacionId);
  }
}