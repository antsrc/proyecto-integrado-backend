import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
  ConflictException,
} from '@nestjs/common';
import { AlquilerService } from './alquiler.service';
import { CreateAlquilerDto } from './dto/create-alquiler.dto';
import { UpdateAlquilerDto } from './dto/update-alquiler.dto';
import { Alquiler } from './alquiler.entity';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadPdfOptions } from 'src/shared/options/upload-pdf.options';

@ApiTags('Alquileres')
@Controller('alquileres')
export class AlquilerController {
  constructor(private readonly alquilerService: AlquilerService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo alquiler' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        documento: {
          type: 'string',
          format: 'binary',
        },
        clienteId: { type: 'number' },
        inmuebleId: { type: 'number' },
        fechaAlta: { type: 'string', format: 'date-time' },
        fechaBaja: { type: 'string', format: 'date-time' },
        fianza: { type: 'number' },
        codContrato: { type: 'string' },
      },
      required: [
        'documento',
        'clienteId',
        'inmuebleId',
        'fechaAlta',
        'fianza',
        'codContrato',
      ],
    },
  })
  @UseInterceptors(FileInterceptor('documento', uploadPdfOptions))
  async create(
    @Body() dto: CreateAlquilerDto,
    @UploadedFile() documento: Express.Multer.File,
  ): Promise<Alquiler> {
    return this.alquilerService.create(dto, documento?.filename);
  }

@Patch(':id/contrato')
@ApiOperation({ summary: 'Actualizar el contrato (PDF) de un alquiler' })
@ApiConsumes('multipart/form-data')
@ApiBody({
  description: 'Nuevo documento PDF del contrato',
  type: 'multipart/form-data',
  schema: {
    type: 'object',
    properties: {
      documento: {
        type: 'string',
        format: 'binary',
      },
    },
    required: ['documento'],
  },
})
@UseInterceptors(FileInterceptor('documento', uploadPdfOptions))
async updateContrato(
  @Param('id') id: string,
  @UploadedFile() documento: Express.Multer.File,
) {
  const nuevoNombre = documento?.filename;
  return this.alquilerService.updateContrato(+id, nuevoNombre);
}

  @Get()
  @ApiOperation({ summary: 'Listar todos los alquileres' })
  findAll(): Promise<Alquiler[]> {
    return this.alquilerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un alquiler por ID' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Alquiler> {
    const alquiler = await this.alquilerService.findOne(id);
    if (!alquiler) throw new NotFoundException();
    return alquiler;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un alquiler por ID' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAlquilerDto,
  ): Promise<Alquiler> {
    const updated = await this.alquilerService.update(id, dto);
    if (!updated) throw new NotFoundException();
    return updated;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un alquiler por ID' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Alquiler> {
    const removed = await this.alquilerService.remove(id);
    if (!removed) throw new NotFoundException();
    return removed;
  }
}
