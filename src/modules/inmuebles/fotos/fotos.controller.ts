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
} from '@nestjs/common';
import { FotosService } from './fotos.service';

import { Foto } from '../entities/foto.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';

@Controller('inmuebles/:inmuebleId/fotos')
export class FotosController {
  constructor(private readonly fotoService: FotosService) {}

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
  async findAll(@Param('inmuebleId') inmuebleId: number): Promise<Foto[]> {
    return this.fotoService.findAll(inmuebleId);
  }

  // @Get(':fotoId')
  // async findOne(
  //   @Param('inmuebleId') inmuebleId: number,
  //   @Param('fotoId') fotoId: number,
  // ): Promise<{ url: string } | null> {
  //   return this.fotoService.findOne(inmuebleId, fotoId);
  // }

  // @Patch(':fotoId')
  // async update(
  //   @Param('inmuebleId') inmuebleId: number,
  //   @Param('fotoId') fotoId: number,
  //   @Body() updateFotoDto: UpdateFotoDto,
  // ): Promise<Foto | null> {
  //   return this.fotoService.update(inmuebleId, fotoId, updateFotoDto);
  // }

  @Delete(':fotoId')
  async remove(
    @Param('inmuebleId') inmuebleId: number,
    @Param('fotoId') fotoId: number,
  ): Promise<boolean> {
    return this.fotoService.remove(inmuebleId, fotoId);
  }
}
