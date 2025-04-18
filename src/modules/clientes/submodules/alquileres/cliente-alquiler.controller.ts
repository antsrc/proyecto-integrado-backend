import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Alquiler } from 'src/modules/alquileres/alquiler.entity';
import { AlquilerService } from 'src/modules/alquileres/alquiler.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Alquileres')
@Controller('clientes/:clienteId/alquileres')
export class ClienteAlquilerController {
  constructor(private readonly alquilerService: AlquilerService) {}

  @Get()
  @ApiOperation({ summary: 'Listar alquileres asociados a un cliente' })
  findByCliente(
    @Param('clienteId', ParseIntPipe) clienteId: number,
  ): Promise<Alquiler[]> {
    return this.alquilerService.findByCliente(clienteId);
  }
}