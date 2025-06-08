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
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { MensualidadService } from './mensualidad.service';
import { CreateMensualidadDto } from './dto/create-mensualidad.dto';
import { UpdateMensualidadDto } from './dto/update-mensualidad.dto';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { RequestUser } from 'src/common/decorators/current-user.decorator';
import { Mensualidad } from './mensualidad.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadPdfOptions } from 'src/shared/options/upload-pdf.options';

@UseGuards(RolesGuard)
@Roles('user')
@ApiTags('Mensualidades')
@Controller('mensualidades')
export class MensualidadController {
  constructor(private readonly mensualidadService: MensualidadService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva mensualidad' })
  create(
    @Body() createMensualidadDto: CreateMensualidadDto,
    @RequestUser() user: { nombre: string },
  ): Promise<void> {
    return this.mensualidadService.create(createMensualidadDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las mensualidades' })
  findAll(): Promise<Mensualidad[]> {
    return this.mensualidadService.findAll();
  }

  @Get('facturas')
  @ApiOperation({ summary: 'Obtener lista de IDs de mensualidades con PDF de factura' })
  getIdsConFactura() {
    return this.mensualidadService.getIdsConFactura();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una mensualidad por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mensualidadService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una mensualidad' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMensualidadDto: UpdateMensualidadDto,
    @RequestUser() user: { nombre: string },
  ): Promise<void> {
    return this.mensualidadService.update(id, updateMensualidadDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una mensualidad' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @RequestUser() user: { nombre: string },
  ): Promise<void> {
    return this.mensualidadService.remove(id, user);
  }

  @Patch(':id/factura')
  @ApiOperation({ summary: 'Actualizar la factura (PDF) de una mensualidad' })
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
    return this.mensualidadService.updateFactura(id, documento?.filename);
  }
}