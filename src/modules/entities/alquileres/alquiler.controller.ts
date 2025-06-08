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
import { AlquilerService } from './alquiler.service';
import { CreateAlquilerDto } from './dto/create-alquiler.dto';
import { UpdateAlquilerDto } from './dto/update-alquiler.dto';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadPdfOptions } from 'src/shared/options/upload-pdf.options';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { RequestUser } from 'src/common/decorators/current-user.decorator';

@UseGuards(RolesGuard)
@Roles('user')
@ApiTags('Alquileres')
@Controller('alquileres')
export class AlquilerController {
  constructor(private readonly alquilerService: AlquilerService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo alquiler' })
  create(
    @Body() createAlquilerDto: CreateAlquilerDto,
    @RequestUser() user: { nombre: string },
  ): Promise<void> {
    return this.alquilerService.create(createAlquilerDto, user);
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
        documento: { type: 'string', format: 'binary' },
      },
      required: ['documento'],
    },
  })
  @UseInterceptors(FileInterceptor('documento', uploadPdfOptions))
  async updateContrato(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() documento: Express.Multer.File,
  ): Promise<string> {
    return this.alquilerService.updateContrato(id, documento?.filename);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los alquileres' })
  findAll() {
    return this.alquilerService.findAll();
  }

  @Get('contratos')
  @ApiOperation({ summary: 'Obtener lista de IDs de alquileres con PDF de contrato' })
  getIdsConContratoPdf() {
    return this.alquilerService.getIdsConContrato();
  }

  @Get('summary')
  @ApiOperation({ summary: 'Obtener todos los alquileres (id y codigo)' })
  findAllActiveIdCodigo() {
    return this.alquilerService.findAllActiveIdCodigo();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un alquiler por ID' })
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.alquilerService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un alquiler por ID' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAlquilerDto,
    @RequestUser() user: { nombre: string },
  ): Promise<void> {
    return this.alquilerService.update(id, dto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un alquiler por ID' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @RequestUser() user: { nombre: string },
  ): Promise<void> {
    return this.alquilerService.remove(id, user);
  }
}
