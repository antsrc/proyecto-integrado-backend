import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { FotoService } from './foto.service';

import { Foto } from './foto.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { ApiOperation } from '@nestjs/swagger';

@Controller('inmuebles/:inmuebleId/fotos')
export class FotoController {
  constructor(private readonly fotoService: FotoService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      dest: path.join(__dirname, '../../../../uploads/fotos/inmuebles'),
    }),
  )
  async upload(
    @Param('inmuebleId') inmuebleId: number,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const fileNames = await this.fotoService.upload(inmuebleId, files);
    return { fileNames };
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las fotos de un inmueble' })
  findAll(
    @Param('inmuebleId', ParseIntPipe) inmuebleId: number,
  ): Promise<Foto[]> {
    return this.fotoService.findAll(inmuebleId)
  }

  @Delete(':fotoId')
  @ApiOperation({ summary: 'Eliminar una foto de un inmueble' })
  async remove(
    @Param('inmuebleId', ParseIntPipe) inmuebleId: number,
    @Param('fotoId', ParseIntPipe) fotoId: number,
  ): Promise<Foto> {
    const foto = await this.fotoService.remove(fotoId);
    if (!foto) throw new NotFoundException();
    return foto;
  }
}
