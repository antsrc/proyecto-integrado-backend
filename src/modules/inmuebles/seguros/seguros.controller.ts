import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SegurosService } from './seguros.service';
import { CreateSeguroDto } from '../dto/create-seguro.dto';
import { UpdateSeguroDto } from '../dto/update-seguro.dto';
import { Seguro } from '../entities/seguro.entity';

@Controller('inmuebles/:inmuebleId/seguros')
export class SegurosController {
  constructor(private readonly segurosService: SegurosService) {}

  @Post()
  async create(
    @Param('inmuebleId') inmuebleId: number,
    @Body() createSeguroDto: CreateSeguroDto,
  ): Promise<Seguro> {
    return this.segurosService.create(inmuebleId, createSeguroDto);
  }

  @Get()
  async findAll(@Param('inmuebleId') inmuebleId: number): Promise<Seguro[]> {
    return this.segurosService.findAll(inmuebleId);
  }

  @Get(':seguroId')
  async findOne(
    @Param('inmuebleId') inmuebleId: number,
    @Param('seguroId') seguroId: number,
  ): Promise<Seguro | null> {
    return this.segurosService.findOne(inmuebleId, seguroId);
  }

  @Patch(':seguroId')
  async update(
    @Param('inmuebleId') inmuebleId: number,
    @Param('seguroId') seguroId: number,
    @Body() updateSeguroDto: UpdateSeguroDto,
  ): Promise<Seguro | null> {
    return this.segurosService.update(inmuebleId, seguroId, updateSeguroDto);
  }

  @Delete(':seguroId')
  async remove(
    @Param('inmuebleId') inmuebleId: number,
    @Param('seguroId') seguroId: number,
  ): Promise<boolean> {
    return this.segurosService.remove(inmuebleId, seguroId);
  }
}