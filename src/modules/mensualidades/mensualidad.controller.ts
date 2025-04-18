import { Controller, Get } from '@nestjs/common';
import { MensualidadService } from './mensualidad.service';
import { Mensualidad } from './mensualidad.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Mensualidades')
@Controller('mensualidades')
export class MensualidadController {
  constructor(private readonly mensualidadService: MensualidadService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las mensualidades' })
  findAll(): Promise<Mensualidad[]> {
    return this.mensualidadService.findAll();
  }
}