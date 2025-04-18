import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Incidencia } from 'src/modules/incidencias/incidencia.entity';
import { IncidenciaService } from 'src/modules/incidencias/incidencia.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Incidencias')
@Controller('clientes/:clienteId/incidencias')
export class ClienteIncidenciaController {
  constructor(private readonly incidenciaService: IncidenciaService) {}

  @Get()
  @ApiOperation({ summary: 'Listar incidencias asociadas a un cliente' })
  findByCliente(
    @Param('clienteId', ParseIntPipe) clienteId: number,
  ): Promise<Incidencia[]> {
    return this.incidenciaService.findByCliente(clienteId);
  }
}