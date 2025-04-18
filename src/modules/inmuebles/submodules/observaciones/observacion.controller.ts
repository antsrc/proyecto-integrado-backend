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

@ApiTags('Observaciones de inmuebles')
@Controller('inmuebles/:inmuebleId/observaciones')
export class ObservacionController {
  constructor(private readonly service: ObservacionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una observación para un inmueble' })
  create(
    @Param('inmuebleId', ParseIntPipe) inmuebleId: number,
    @Body() dto: CreateObservacionDto,
  ): Promise<Observacion | null> {
    return this.service.create(inmuebleId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar observaciones de un inmueble' })
  findAll(
    @Param('inmuebleId', ParseIntPipe) inmuebleId: number,
  ): Promise<Observacion[]> {
    return this.service.findAll(inmuebleId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una observación de inmueble' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateObservacionDto,
  ): Promise<Observacion> {
    const updated = await this.service.update(id, dto);
    if (!updated) throw new NotFoundException();
    return updated;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una observación de inmueble' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observacion> {
    const removed = await this.service.remove(id);
    if (!removed) throw new NotFoundException();
    return removed;
  }
}
