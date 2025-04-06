import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIbiDto } from '../dto/create-ibi.dto';
import { UpdateIbiDto } from '../dto/update-ibi.dto';
import { Ibi } from '../entities/ibi.entity';

@Injectable()
export class IbiService {
  constructor(
    @InjectRepository(Ibi)
    private readonly ibisRepository: Repository<Ibi>,
  ) {}

  async create(inmuebleId: number, createIbiDto: CreateIbiDto): Promise<Ibi> {
    const ibi = this.ibisRepository.create({ ...createIbiDto, inmuebleId });
    return this.ibisRepository.save(ibi);
  }

  async findAll(inmuebleId: number): Promise<Ibi[]> {
    return this.ibisRepository.find({ where: { inmuebleId } });
  }

  async findOne(inmuebleId: number, id: number): Promise<Ibi | null> {
    return this.ibisRepository.findOne({ where: { id, inmuebleId } });
  }

  async update(inmuebleId: number, id: number, updateIbiDto: UpdateIbiDto): Promise<Ibi | null> {
    const ibi = await this.findOne(inmuebleId, id);
    if (!ibi) return null;
    await this.ibisRepository.update(id, { ...updateIbiDto, inmuebleId });
    return this.findOne(inmuebleId, id);
  }

  async remove(inmuebleId: number, id: number): Promise<boolean> {
    const ibi = await this.findOne(inmuebleId, id);
    if (!ibi) return false;
    const result = await this.ibisRepository.delete(id);
    return result.affected === 1;
  }
}