import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seguro } from './seguro.entity';
import { CreateSeguroDto } from './dto/create-seguro.dto';
import { UpdateSeguroDto } from './dto/update-seguro.dto';

@Injectable()
export class SegurosService {
  constructor(
    @InjectRepository(Seguro)
    private readonly segurosRepository: Repository<Seguro>,
  ) {}

  async create(
    inmuebleId: number,
    createSeguroDto: CreateSeguroDto,
  ): Promise<Seguro | null> {
    const seguro = this.segurosRepository.create({
      ...createSeguroDto,
      inmueble: { id: inmuebleId } as any,
    });
    const saved = await this.segurosRepository.save(seguro);
    return this.findOne(saved.id);
  }

  async findAll(inmuebleId: number): Promise<Seguro[]> {
    return this.segurosRepository.find({
      where: { inmueble: { id: inmuebleId } },
    });
  }

  async findOne(id: number): Promise<Seguro | null> {
    return this.segurosRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateSeguroDto): Promise<Seguro | null> {
    const seguro = await this.findOne(id);
    if (!seguro) return null;
    await this.segurosRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Seguro | null> {
    const seguro = await this.findOne(id);
    if (!seguro) return null;
    await this.segurosRepository.delete(id);
    return seguro;
  }
}