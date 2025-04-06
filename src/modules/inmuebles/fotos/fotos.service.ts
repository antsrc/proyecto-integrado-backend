import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Foto } from '../entities/foto.entity';
import { CreateFotoDto } from '../dto/create-foto.dto';
import { UpdateFotoDto } from '../dto/update-foto.dto';

@Injectable()
export class FotoService {
  constructor(
    @InjectRepository(Foto)
    private readonly fotoRepository: Repository<Foto>,
  ) {}

  async create(inmuebleId: number, createFotoDto: CreateFotoDto): Promise<Foto> {
    const foto = this.fotoRepository.create({ ...createFotoDto, inmueble: { id: inmuebleId } });
    return this.fotoRepository.save(foto);
  }

  async findAll(inmuebleId: number): Promise<Foto[]> {
    return this.fotoRepository.find({ where: { inmueble: { id: inmuebleId } }, relations: ['inmueble'] });
  }

  async findOne(inmuebleId: number, id: number): Promise<{ url: string } | null> {
    const foto = await this.fotoRepository.findOne({ 
      where: { id, inmueble: { id: inmuebleId } }, 
      relations: ['inmueble'] 
    });
    if (!foto) return null;
    return { url: `http://localhost:3000/uploads/fotos/${foto.imagen}` };
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