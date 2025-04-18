import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ibi } from './ibi.entity';
import { CreateIbiDto } from './dto/create-ibi.dto';
import { UpdateIbiDto } from './dto/update-ibi.dto';

@Injectable()
export class IbisService {
  constructor(
    @InjectRepository(Ibi)
    private readonly ibisRepository: Repository<Ibi>,
  ) {}

  async create(inmuebleId: number, createIbiDto: CreateIbiDto): Promise<Ibi | null> {
    const ibi = this.ibisRepository.create({
      ...createIbiDto,
      inmueble: { id: inmuebleId } as any,
    });
    const saved = await this.ibisRepository.save(ibi);
    return this.findOne(saved.id);
  }

  async findAll(inmuebleId: number): Promise<Ibi[]> {
    return this.ibisRepository.find({
      where: { inmueble: { id: inmuebleId } }
    });
  }

  async findOne(id: number): Promise<Ibi | null> {
    return this.ibisRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateIbiDto): Promise<Ibi | null> {
    const ibi = await this.findOne(id);
    if (!ibi) return null;
    await this.ibisRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Ibi | null> {
    const ibi = await this.findOne(id);
    if (!ibi) return null;
    await this.ibisRepository.delete(id);
    return ibi;
  }
}
