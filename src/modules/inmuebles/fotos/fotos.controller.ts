import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FotoService } from './fotos.service';
import { CreateFotoDto } from '../dto/create-foto.dto';
import { UpdateFotoDto } from '../dto/update-foto.dto';
import { Foto } from '../entities/foto.entity';

@Controller('inmuebles/:inmuebleId/fotos')
export class FotoController {
  constructor(private readonly fotoService: FotoService) {}

  @Post()
  async create(
    @Param('inmuebleId') inmuebleId: number,
    @Body() createFotoDto: CreateFotoDto,
  ): Promise<Foto> {
    return this.fotoService.create(inmuebleId, createFotoDto);
  }

  @Get()
  async findAll(@Param('inmuebleId') inmuebleId: number): Promise<Foto[]> {
    return this.fotoService.findAll(inmuebleId);
  }

  @Get(':fotoId')
  async findOne(
    @Param('inmuebleId') inmuebleId: number,
    @Param('fotoId') fotoId: number,
  ): Promise<{ url: string } | null> {
    return this.fotoService.findOne(inmuebleId, fotoId);
  }

  // @Patch(':fotoId')
  // async update(
  //   @Param('inmuebleId') inmuebleId: number,
  //   @Param('fotoId') fotoId: number,
  //   @Body() updateFotoDto: UpdateFotoDto,
  // ): Promise<Foto | null> {
  //   return this.fotoService.update(inmuebleId, fotoId, updateFotoDto);
  // }

  @Delete(':fotoId')
  async remove(
    @Param('inmuebleId') inmuebleId: number,
    @Param('fotoId') fotoId: number,
  ): Promise<boolean> {
    return this.fotoService.remove(inmuebleId, fotoId);
  }
}