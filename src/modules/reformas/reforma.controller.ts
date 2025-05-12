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
} from '@nestjs/common';
import { ReformaService } from './reforma.service';
import { CreateReformaDto } from './dto/create-reforma.dto';
import { UpdateReformaDto } from './dto/update-reforma.dto';
import { Reforma } from './reforma.entity';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadPdfOptions } from 'src/shared/options/upload-pdf.options';

@ApiTags('Reformas')
@Controller('reformas')
export class ReformaController {
  constructor(private readonly reformaService: ReformaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva reforma' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        documento: {
          type: 'string',
          format: 'binary',
        },
        inmuebleId: { type: 'number' },
        proveedorId: { type: 'number' },
        descripcion: { type: 'string' },
        observacion: { type: 'string' },
        fechaInicio: { type: 'string', format: 'date' },
        fechaFin: { type: 'string', format: 'date' },
        importe: { type: 'number' },
        codFactura: { type: 'string' },
      },
      required: [
        'documento',
        'inmuebleId',
        'proveedorId',
        'descripcion',
        'observacion',
        'fechaInicio',
        'importe',
        'codFactura',
      ],
    },
  })
  @UseInterceptors(FileInterceptor('documento', uploadPdfOptions))
  async create(
    @Body() dto: CreateReformaDto,
    @UploadedFile() documento: Express.Multer.File,
  ): Promise<Reforma> {
    return this.reformaService.create(dto, documento?.filename);
  }

  @Patch(':id/factura')
  @ApiOperation({ summary: 'Actualizar la factura (PDF) de una reforma' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Nuevo documento PDF de la factura',
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
  async updateFactura(
    @Param('id') id: string,
    @UploadedFile() documento: Express.Multer.File,
  ) {
    const nuevoNombre = documento?.filename;
    return this.reformaService.updateFactura(+id, nuevoNombre);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las reformas' })
  findAll(): Promise<Reforma[]> {
    return this.reformaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una reforma por ID' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Reforma> {
    const reforma = await this.reformaService.findOne(id);
    if (!reforma) throw new NotFoundException();
    return reforma;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una reforma por ID' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReformaDto,
  ): Promise<Reforma> {
    const updated = await this.reformaService.update(id, dto);
    if (!updated) throw new NotFoundException();
    return updated;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una reforma por ID' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Reforma> {
    const removed = await this.reformaService.remove(id);
    if (!removed) throw new NotFoundException();
    return removed;
  }
}
