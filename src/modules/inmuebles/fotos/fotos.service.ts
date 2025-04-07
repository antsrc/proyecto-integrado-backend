import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Foto } from '../entities/foto.entity';
import { CreateFotoDto } from '../dto/create-foto.dto';
import { UpdateFotoDto } from '../dto/update-foto.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FotosService {
  constructor(
    @InjectRepository(Foto)
    private readonly fotoRepository: Repository<Foto>,
  ) {}

  // async create(inmuebleId: number, createFotoDto: CreateFotoDto): Promise<Foto> {
  //   const foto = this.fotoRepository.create({ ...createFotoDto, inmueble: { id: inmuebleId } });
  //   return this.fotoRepository.save(foto);
  // }

  async upload(
    inmuebleId: number,
    files: Express.Multer.File[],
  ): Promise<string[]> {
    const fotos = files.map((file) => {
      return this.fotoRepository.create({
        imagen: file.filename,
        inmueble: { id: inmuebleId },
      });
    });
    await this.fotoRepository.save(fotos);
    return fotos.map((foto) => foto.imagen);
  }

  async findAll(inmuebleId: number): Promise<Foto[]> {
    const fotos = await this.fotoRepository.find({
      where: { inmueble: { id: inmuebleId } },
    });
    return fotos.map((foto) => ({
      ...foto,
      imagen: `http://localhost:3000/uploads/fotos/inmuebles/${foto.imagen}`,
    }));
  }

  async findOne(
    inmuebleId: number,
    id: number,
  ): Promise<Foto | null> {
    return this.fotoRepository.findOne({
      where: { id, inmueble: { id: inmuebleId } },
    });
  }

  // async update(inmuebleId: number, id: number, updateFotoDto: UpdateFotoDto): Promise<Foto | null> {
  //   const foto = await this.findOne(inmuebleId, id);
  //   if (!foto) return null;
  //   await this.fotoRepository.update(id, { ...updateFotoDto, inmueble: { id: inmuebleId } });
  //   return this.findOne(inmuebleId, id);
  // }

  async remove(inmuebleId: number, id: number): Promise<boolean> {
    const foto = await this.findOne(inmuebleId, id);
    if (!foto) return false;
    const result = await this.fotoRepository.delete(id);
    return result.affected === 1;
  }
}
