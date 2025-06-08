import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ReformaService } from './reforma.service';
import { CreateReformaDto } from './dto/create-reforma.dto';
import { UpdateReformaDto } from './dto/update-reforma.dto';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadPdfOptions } from 'src/shared/options/upload-pdf.options';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { RequestUser } from 'src/common/decorators/current-user.decorator';

@UseGuards(RolesGuard)
@Roles('user')
@ApiTags('Reformas')
@Controller('reformas')
export class ReformaController {
  constructor(private readonly reformaService: ReformaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva reforma' })
  create(
    @Body() createReformaDto: CreateReformaDto,
    @RequestUser() user: { nombre: string },
  ): Promise<void> {
    return this.reformaService.create(createReformaDto, user);
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
    return this.reformaService.updateFactura(id, documento?.filename);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las reformas' })
  findAll() {
    return this.reformaService.findAll();
  }

  @Get('facturas')
  @ApiOperation({ summary: 'Obtener lista de IDs de reformas con PDF de factura' })
  getIdsConFacturaPdf() {
    return this.reformaService.getIdsConFactura();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una reforma por ID' })
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.reformaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una reforma por ID' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReformaDto,
    @RequestUser() user: { nombre: string },
  ): Promise<void> {
    return this.reformaService.update(id, dto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una reforma por ID' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @RequestUser() user: { nombre: string },
  ): Promise<void> {
    return this.reformaService.remove(id, user);
  }
}
