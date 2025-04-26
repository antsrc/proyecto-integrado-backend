import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Incidencia } from 'src/modules/incidencias/incidencia.entity';
import { IncidenciaService } from 'src/modules/incidencias/incidencia.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Incidencias')
@Controller('inmuebles/:inmuebleId/incidencias')
export class InmuebleIncidenciaController {
  constructor(private readonly incidenciaService: IncidenciaService) {}

  @Get()
  @ApiOperation({ summary: 'Listar incidencias asociadas a un inmueble' })
  findByInmueble(
    @Param('inmuebleId', ParseIntPipe) inmuebleId: number,
  ): Promise<Incidencia[]> {
    return this.incidenciaService.findByInmueble(inmuebleId);
  }
}