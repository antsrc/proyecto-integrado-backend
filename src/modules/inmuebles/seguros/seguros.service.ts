import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seguro } from '../entities/seguro.entity';
import { CreateSeguroDto } from '../dto/create-seguro.dto';
import { UpdateSeguroDto } from '../dto/update-seguro.dto';

@Injectable()
export class SegurosService {
  constructor(
    @InjectRepository(Seguro)
    private readonly seguroRepository: Repository<Seguro>,
  ) {}

  async create(inmuebleId: number, createSeguroDto: CreateSeguroDto): Promise<Seguro> {
    const seguro = this.seguroRepository.create({ ...createSeguroDto, inmuebleId });
    return this.seguroRepository.save(seguro);
  }

  async findAll(inmuebleId: number): Promise<Seguro[]> {
    return this.seguroRepository.find({ where: { inmuebleId } });
  }

  async findOne(inmuebleId: number, id: number): Promise<Seguro | null> {
    return this.seguroRepository.findOne({ where: { id, inmuebleId } });
  }

  async update(inmuebleId: number, id: number, updateSeguroDto: UpdateSeguroDto): Promise<Seguro | null> {
    const seguro = await this.findOne(inmuebleId, id);
    if (!seguro) return null;
    await this.seguroRepository.update(id, { ...updateSeguroDto, inmuebleId });
    return this.findOne(inmuebleId, id);
  }

  async remove(inmuebleId: number, id: number): Promise<boolean> {
    const seguro = await this.findOne(inmuebleId, id);
    if (!seguro) return false;
    const result = await this.seguroRepository.delete(id);
    return result.affected === 1;
  }
}