import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ReformaService } from 'src/modules/reformas/reforma.service';
import { Reforma } from 'src/modules/reformas/reforma.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Reformas')
@Controller('inmuebles/:inmuebleId/reformas')
export class InmuebleReformaController {
  constructor(private readonly reformaService: ReformaService) {}

  @Get()
  @ApiOperation({ summary: 'Listar reformas asociadas a un inmueble' })
  findByInmueble(
    @Param('inmuebleId', ParseIntPipe) inmuebleId: number,
  ): Promise<Reforma[]> {
    return this.reformaService.findByInmueble(inmuebleId);
  }
}
