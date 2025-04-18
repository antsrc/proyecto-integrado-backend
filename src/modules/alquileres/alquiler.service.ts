import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alquiler } from './alquiler.entity';
import { CreateAlquilerDto } from './dto/create-alquiler.dto';
import { UpdateAlquilerDto } from './dto/update-alquiler.dto';

@Injectable()
export class AlquilerService {
  constructor(
    @InjectRepository(Alquiler)
    private readonly alquilerRepository: Repository<Alquiler>,
  ) {}

  async create(dto: CreateAlquilerDto): Promise<Alquiler> {
    const alquiler = this.alquilerRepository.create({
      ...dto,
      cliente: { id: dto.clienteId } as any,
      inmueble: { id: dto.inmuebleId } as any,
    });
    return this.alquilerRepository.save(alquiler);
  }

  async findAll(): Promise<Alquiler[]> {
    return this.alquilerRepository.find({
      relations: ['cliente', 'inmueble'],
    });
  }

  async findOne(id: number): Promise<Alquiler | null> {
    return this.alquilerRepository.findOne({
      where: { id },
    });
  }

  async findByInmueble(inmuebleId: number): Promise<Alquiler[]> {
    return this.alquilerRepository.find({
      where: { inmueble: { id: inmuebleId } },
      relations: ['cliente'],
    });
  }

  async findByCliente(clienteId: number): Promise<Alquiler[]> {
    return this.alquilerRepository.find({
      where: { cliente: { id: clienteId } },
      relations: ['inmueble'],
    });
  }

  async update(id: number, dto: UpdateAlquilerDto): Promise<Alquiler | null> {
    const alquiler = await this.findOne(id);
    if (!alquiler) return null;
    await this.alquilerRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Alquiler | null> {
    const alquiler = await this.findOne(id);
    if (!alquiler) return null;
    await this.alquilerRepository.delete(id);
    return alquiler;
  }
}