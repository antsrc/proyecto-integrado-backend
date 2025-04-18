import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { RentaService } from './renta.service';
import { CreateRentaDto } from './dto/create-renta.dto';
import { UpdateRentaDto } from './dto/update-renta.dto';
import { Renta } from './renta.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Rentas')
@Controller('inmuebles/:inmuebleId/rentas')
export class RentaController {
  constructor(private readonly rentaService: RentaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una renta para un inmueble' })
  create(
    @Param('inmuebleId', ParseIntPipe) inmuebleId: number,
    @Body() createRentaDto: CreateRentaDto,
  ): Promise<Renta | null> {
    return this.rentaService.create(inmuebleId, createRentaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar rentas de un inmueble' })
  findAll(
    @Param('inmuebleId', ParseIntPipe) inmuebleId: number,
  ): Promise<Renta[]> {
    return this.rentaService.findAll(inmuebleId);
  }

  @Patch(':rentaId')
  @ApiOperation({ summary: 'Actualizar una renta de un inmueble' })
  async update(
    @Param('inmuebleId', ParseIntPipe) inmuebleId: number,
    @Param('rentaId', ParseIntPipe) rentaId: number,
    @Body() updateRentaDto: UpdateRentaDto,
  ): Promise<Renta> {
    const renta = await this.rentaService.update(rentaId, updateRentaDto);
    if (!renta) throw new NotFoundException();
    return renta;
  }

  @Delete(':rentaId')
  @ApiOperation({ summary: 'Eliminar una renta de un inmueble' })
  async remove(
    @Param('inmuebleId', ParseIntPipe) inmuebleId: number,
    @Param('rentaId', ParseIntPipe) rentaId: number,
  ): Promise<Renta> {
    const renta = await this.rentaService.remove(rentaId);
    if (!renta) throw new NotFoundException();
    return renta;
  }
}