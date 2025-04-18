import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Alquiler } from 'src/modules/alquileres/alquiler.entity';
import { AlquilerService } from 'src/modules/alquileres/alquiler.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Alquileres')
@Controller('inmuebles/:inmuebleId/alquileres')
export class InmuebleAlquilerController {
  constructor(private readonly alquilerService: AlquilerService) {}

  @Get()
  @ApiOperation({ summary: 'Listar alquileres asociados a un inmueble' })
  findByInmueble(
    @Param('inmuebleId', ParseIntPipe) inmuebleId: number,
  ): Promise<Alquiler[]> {
    return this.alquilerService.findByInmueble(inmuebleId);
  }
}
