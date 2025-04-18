import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ObservacionService } from './observacion.service';
import { CreateObservacionDto } from './dto/create-observacion.dto';
import { UpdateObservacionDto } from './dto/update-observacion.dto';
import { Observacion } from './observacion.entity';

@ApiTags('Observaciones de proveedores')
@Controller('proveedores/:proveedorId/observaciones')
export class ObservacionController {
  constructor(private readonly service: ObservacionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una observación para un proveedor' })
  create(
    @Param('proveedorId', ParseIntPipe) proveedorId: number,
    @Body() dto: CreateObservacionDto,
  ): Promise<Observacion | null> {
    return this.service.create(proveedorId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar observaciones de un proveedor' })
  findAll(
    @Param('proveedorId', ParseIntPipe) proveedorId: number,
  ): Promise<Observacion[]> {
    return this.service.findAll(proveedorId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una observación de proveedor' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateObservacionDto,
  ): Promise<Observacion> {
    const updated = await this.service.update(id, dto);
    if (!updated) throw new NotFoundException();
    return updated;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una observación de proveedor' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observacion> {
    const removed = await this.service.remove(id);
    if (!removed) throw new NotFoundException();
    return removed;
  }
}