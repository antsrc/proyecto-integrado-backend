import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tipo } from './tipo.entity';
import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';

@Injectable()
export class TipoService {
  constructor(
    @InjectRepository(Tipo)
    private readonly tipoRepository: Repository<Tipo>,
  ) {}

  async create(dto: CreateTipoDto): Promise<Tipo> {
    const tipo = this.tipoRepository.create(dto);
    return this.tipoRepository.save(tipo);
  }

  async findAll(): Promise<Tipo[]> {
    return this.tipoRepository.find();
  }

  async findOne(id: number): Promise<Tipo | null> {
    return this.tipoRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateTipoDto): Promise<Tipo | null> {
    const tipo = await this.findOne(id);
    if (!tipo) return null;

    await this.tipoRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Tipo | null> {
    const tipo = await this.findOne(id);
    if (!tipo) return null;
    await this.tipoRepository.delete(id);
    return tipo;
  }
}
