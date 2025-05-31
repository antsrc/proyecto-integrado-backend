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
import { MensualidadService } from '../../../mensualidades/mensualidad.service';
import { CreateMensualidadDto } from '../../../mensualidades/dto/create-mensualidad.dto';
import { UpdateMensualidadDto } from '../../../mensualidades/dto/update-mensualidad.dto';
import { Mensualidad } from '../../../mensualidades/mensualidad.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Mensualidades')
@Controller('alquileres/:alquilerId/mensualidades')
export class AlquilerMensualidadController {
  constructor(private readonly mensualidadService: MensualidadService) {}

//   @Post()
//   @ApiOperation({ summary: 'Crear mensualidad para un alquiler' })
//   create(
//     @Param('alquilerId', ParseIntPipe) alquilerId: number,
//     @Body() dto: CreateMensualidadDto,
//   ): Promise<Mensualidad> {
//     return this.mensualidadService.create({ ...dto, alquilerId });
//   }

//   @Get()
//   @ApiOperation({ summary: 'Listar mensualidades de un alquiler' })
//   findAll(
//     @Param('alquilerId', ParseIntPipe) alquilerId: number,
//   ): Promise<Mensualidad[]> {
//     return this.mensualidadService.findByAlquiler(alquilerId);
//   }

//   @Patch(':id')
//   @ApiOperation({ summary: 'Actualizar una mensualidad de un alquiler' })
//   async update(
//     @Param('id', ParseIntPipe) id: number,
//     @Body() dto: UpdateMensualidadDto,
//   ): Promise<Mensualidad> {
//     const updated = await this.mensualidadService.update(id, dto);
//     if (!updated) throw new NotFoundException();
//     return updated;
//   }

//   @Delete(':id')
//   @ApiOperation({ summary: 'Eliminar una mensualidad de un alquiler' })
//   async remove(@Param('id', ParseIntPipe) id: number): Promise<Mensualidad> {
//     const deleted = await this.mensualidadService.remove(id);
//     if (!deleted) throw new NotFoundException();
//     return deleted;
//   }
}