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
import { AlquilerService } from './alquiler.service';
import { CreateAlquilerDto } from './dto/create-alquiler.dto';
import { UpdateAlquilerDto } from './dto/update-alquiler.dto';
import { Alquiler } from './alquiler.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Alquileres')
@Controller('alquileres')
export class AlquilerController {
  constructor(private readonly alquilerService: AlquilerService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo alquiler' })
  create(@Body() dto: CreateAlquilerDto): Promise<Alquiler> {
    return this.alquilerService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los alquileres' })
  findAll(): Promise<Alquiler[]> {
    return this.alquilerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un alquiler por ID' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Alquiler> {
    const alquiler = await this.alquilerService.findOne(id);
    if (!alquiler) throw new NotFoundException();
    return alquiler;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un alquiler por ID' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAlquilerDto,
  ): Promise<Alquiler> {
    const updated = await this.alquilerService.update(id, dto);
    if (!updated) throw new NotFoundException();
    return updated;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un alquiler por ID' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Alquiler> {
    const removed = await this.alquilerService.remove(id);
    if (!removed) throw new NotFoundException();
    return removed;
  }
}