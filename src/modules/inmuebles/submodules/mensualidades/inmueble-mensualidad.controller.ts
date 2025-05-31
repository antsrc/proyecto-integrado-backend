import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MensualidadService } from 'src/modules/mensualidades/mensualidad.service';
import { Mensualidad } from 'src/modules/mensualidades/mensualidad.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Mensualidades')
@Controller('inmuebles/:inmuebleId/mensualidades')
export class InmuebleMensualidadController {
  constructor(private readonly mensualidadService: MensualidadService) {}

  // @Get()
  // @ApiOperation({ summary: 'Listar mensualidades de un inmueble' })
  // findByInmueble(
  //   @Param('inmuebleId', ParseIntPipe) inmuebleId: number,
  // ): Promise<Mensualidad[]> {
  //   // return this.mensualidadService.findByInmueble(inmuebleId);
  // }
}