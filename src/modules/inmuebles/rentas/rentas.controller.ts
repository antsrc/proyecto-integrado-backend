import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RentasService } from './rentas.service';
import { CreateRentaDto } from '../dto/create-renta.dto';
import { UpdateRentaDto } from '../dto/update-renta.dto';
import { Renta } from '../entities/renta.entity';

@Controller('inmuebles/:inmuebleId/rentas')
export class RentasController {
  constructor(private readonly rentasService: RentasService) {}

  @Post()
  async create(
    @Param('inmuebleId') inmuebleId: number,
    @Body() createRentaDto: CreateRentaDto,
  ): Promise<Renta> {
    return this.rentasService.create(inmuebleId, createRentaDto);
  }

  @Get()
  async findAll(@Param('inmuebleId') inmuebleId: number): Promise<Renta[]> {
    return this.rentasService.findAll(inmuebleId);
  }

  @Get(':rentaId')
  async findOne(
    @Param('inmuebleId') inmuebleId: number,
    @Param('rentaId') rentaId: number,
  ): Promise<Renta | null> {
    return this.rentasService.findOne(inmuebleId, rentaId);
  }

  @Patch(':rentaId')
  async update(
    @Param('inmuebleId') inmuebleId: number,
    @Param('rentaId') rentaId: number,
    @Body() updateRentaDto: UpdateRentaDto,
  ): Promise<Renta | null> {
    return this.rentasService.update(inmuebleId, rentaId, updateRentaDto);
  }

  @Delete(':rentaId')
  async remove(
    @Param('inmuebleId') inmuebleId: number,
    @Param('rentaId') rentaId: number,
  ): Promise<boolean> {
    return this.rentasService.remove(inmuebleId, rentaId);
  }
}
