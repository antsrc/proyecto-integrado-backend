import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MensualidadService } from 'src/modules/mensualidades/mensualidad.service';
import { Mensualidad } from 'src/modules/mensualidades/mensualidad.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Mensualidades')
@Controller('clientes/:clienteId/mensualidades')
export class ClienteMensualidadController {
  constructor(private readonly mensualidadService: MensualidadService) {}

  // @Get()
  // @ApiOperation({ summary: 'Listar mensualidades de un cliente' })
  // findByCliente(
  //   @Param('clienteId', ParseIntPipe) clienteId: number,
  // ): Promise<Mensualidad[]> {
  //   return this.mensualidadService.findByCliente(clienteId);
  // }
}