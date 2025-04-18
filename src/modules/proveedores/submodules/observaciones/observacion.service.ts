import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observacion } from './observacion.entity';
import { CreateObservacionDto } from './dto/create-observacion.dto';
import { UpdateObservacionDto } from './dto/update-observacion.dto';

@Injectable()
export class ObservacionService {
  constructor(
    @InjectRepository(Observacion)
    private readonly repo: Repository<Observacion>,
  ) {}

  async create(
    proveedorId: number,
    dto: CreateObservacionDto,
  ): Promise<Observacion | null> {
    const observacion = this.repo.create({
      comentario: dto.comentario,
      proveedor: { id: proveedorId } as any,
      fecha: new Date(),
    });
    const saved = await this.repo.save(observacion);
    return this.repo.findOne({ where: { id: saved.id } });
  }

  async findAll(proveedorId: number): Promise<Observacion[]> {
    return this.repo.find({
      where: { proveedor: { id: proveedorId } },
    });
  }

  async findOne(id: number): Promise<Observacion | null> {
    return this.repo.findOne({ where: { id } });
  }

  async update(
    id: number,
    dto: UpdateObservacionDto,
  ): Promise<Observacion | null> {
    const observacion = await this.findOne(id);
    if (!observacion) return null;

    await this.repo.update(id, {
      comentario: dto.comentario,
      fecha: new Date(),
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<Observacion | null> {
    const observacion = await this.findOne(id);
    if (!observacion) return null;
    await this.repo.delete(id);
    return observacion;
  }
}