import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ReparacionService } from './reparacion.service';
import { CreateReparacionDto } from './dto/create-reparacion.dto';
import { UpdateReparacionDto } from './dto/update-reparacion.dto';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { RequestUser } from 'src/common/decorators/current-user.decorator';
import { Reparacion } from './reparacion.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadPdfOptions } from 'src/shared/options/upload-pdf.options';

@UseGuards(RolesGuard)
@Roles('user')
@ApiTags('Reparaciones')
@Controller('reparaciones')
export class ReparacionController {
  constructor(private readonly reparacionService: ReparacionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva reparación' })
  create(
    @Body() createReparacionDto: CreateReparacionDto,
    @RequestUser() user: { nombre: string },
  ): Promise<void> {
    return this.reparacionService.create(createReparacionDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las reparaciones' })
  findAll(): Promise<Reparacion[]> {
    return this.reparacionService.findAll();
  }
  
  @Get('facturas')
  @ApiOperation({ summary: 'Obtener lista de IDs de reparaciones con PDF de factura' })
  getIdsConFactura() {
    return this.reparacionService.getIdsConFactura();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una reparación por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reparacionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una reparación' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReparacionDto: UpdateReparacionDto,
    @RequestUser() user: { nombre: string },
  ): Promise<void> {
    return this.reparacionService.update(id, updateReparacionDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una reparación' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @RequestUser() user: { nombre: string },
  ): Promise<void> {
    return this.reparacionService.remove(id, user);
  }

  @Patch(':id/factura')
  @ApiOperation({ summary: 'Actualizar la factura (PDF) de una reparación' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Nuevo documento PDF de la factura',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        documento: { type: 'string', format: 'binary' },
      },
      required: ['documento'],
    },
  })
  @UseInterceptors(FileInterceptor('documento', uploadPdfOptions))
  async updateFactura(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() documento: Express.Multer.File,
  ): Promise<string> {
    return this.reparacionService.updateFactura(id, documento?.filename);
  }
}
