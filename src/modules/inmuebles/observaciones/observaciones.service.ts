import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observacion } from '../entities/observacion.entity';
import { CreateObservacionDto } from '../dto/create-observacion.dto';
import { UpdateObservacionDto } from '../dto/update-observacion.dto';

@Injectable()
export class ObservacionService {
  constructor(
    @InjectRepository(Observacion)
    private readonly observacionRepository: Repository<Observacion>,
  ) {}

  async create(inmuebleId: number, createObservacionDto: CreateObservacionDto): Promise<Observacion> {
    const observacion = this.observacionRepository.create({ ...createObservacionDto, inmueble: { id: inmuebleId } });
    return this.observacionRepository.save(observacion);
  }

  async findAll(inmuebleId: number): Promise<Observacion[]> {
    return this.observacionRepository.find({ where: { inmueble: { id: inmuebleId } }, relations: ['inmueble'] });
  }

  async findOne(inmuebleId: number, id: number): Promise<Observacion | null> {
    return this.observacionRepository.findOne({ where: { id, inmueble: { id: inmuebleId } }, relations: ['inmueble'] });
  }

  async update(inmuebleId: number, id: number, updateObservacionDto: UpdateObservacionDto): Promise<Observacion | null> {
    const observacion = await this.findOne(inmuebleId, id);
    if (!observacion) return null;
    await this.observacionRepository.update(id, { ...updateObservacionDto, inmueble: { id: inmuebleId } });
    return this.findOne(inmuebleId, id);
  }

  async remove(inmuebleId: number, id: number): Promise<boolean> {
    const observacion = await this.findOne(inmuebleId, id);
    if (!observacion) return false;
    const result = await this.observacionRepository.delete(id);
    return result.affected === 1;
  }
}