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
  import { ReparacionService } from './reparacion.service';
  import { CreateReparacionDto } from './dto/create-reparacion.dto';
  import { UpdateReparacionDto } from './dto/update-reparacion.dto';
  import { Reparacion } from './reparacion.entity';
  import { ApiTags, ApiOperation } from '@nestjs/swagger';
  
  @ApiTags('Reparaciones')
  @Controller('incidencias/:incidenciaId/reparacion')
  export class ReparacionController {
    constructor(private readonly reparacionService: ReparacionService) {}
  
    @Get()
    @ApiOperation({ summary: 'Obtener la reparación asociada a una incidencia' })
    async findByIncidencia(
      @Param('incidenciaId', ParseIntPipe) incidenciaId: number,
    ): Promise<Reparacion> {
      const reparacion = await this.reparacionService.findByIncidencia(incidenciaId);
      if (!reparacion) throw new NotFoundException();
      return reparacion;
    }
  
    @Post()
    @ApiOperation({ summary: 'Crear una reparación para una incidencia' })
    create(
      @Param('incidenciaId', ParseIntPipe) incidenciaId: number,
      @Body() dto: CreateReparacionDto,
    ): Promise<Reparacion> {
      return this.reparacionService.create(incidenciaId, dto);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar una reparación' })
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: UpdateReparacionDto,
    ): Promise<Reparacion> {
      const updated = await this.reparacionService.update(id, dto);
      if (!updated) throw new NotFoundException();
      return updated;
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una reparación' })
    async remove(@Param('id', ParseIntPipe) id: number): Promise<Reparacion> {
      const deleted = await this.reparacionService.remove(id);
      if (!deleted) throw new NotFoundException();
      return deleted;
    }
  }
  