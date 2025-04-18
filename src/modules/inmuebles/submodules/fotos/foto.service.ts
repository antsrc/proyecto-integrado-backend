import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Foto } from './foto.entity';
import { Express } from 'express';

@Injectable()
export class FotoService {
  constructor(
    @InjectRepository(Foto)
    private readonly fotoRepository: Repository<Foto>,
  ) {}

  async upload(
    inmuebleId: number,
    files: Express.Multer.File[],
  ): Promise<Foto[]> {
    const fotos = files.map((file) => {
      return this.fotoRepository.create({
        imagen: file.filename,
        inmueble: { id: inmuebleId } as any,
      });
    });
    await this.fotoRepository.save(fotos);
    return fotos;
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

  async findOne(inmuebleId: number, id: number): Promise<Foto | null> {
    return this.fotoRepository.findOne({
      where: { id, inmueble: { id: inmuebleId } },
    });
  }

  async remove(id: number): Promise<Foto | null> {
    const foto = await this.fotoRepository.findOne({ where: { id } });
    if (!foto) return null;
    await this.fotoRepository.delete(id);
    return foto;
  }
}
