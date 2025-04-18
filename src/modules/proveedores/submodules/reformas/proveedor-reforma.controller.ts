import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Reforma } from 'src/modules/reformas/reforma.entity';
import { ReformaService } from 'src/modules/reformas/reforma.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Reformas')
@Controller('proveedores/:proveedorId/reformas')
export class ProveedorReformaController {
  constructor(private readonly reformaService: ReformaService) {}

  @Get()
  @ApiOperation({ summary: 'Listar reformas realizadas por un proveedor' })
  findByProveedor(
    @Param('proveedorId', ParseIntPipe) proveedorId: number,
  ): Promise<Reforma[]> {
    return this.reformaService.findByProveedor(proveedorId);
  }
}
