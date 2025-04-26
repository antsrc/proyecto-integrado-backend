import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reparacion } from './reparacion.entity';
import { CreateReparacionDto } from './dto/create-reparacion.dto';
import { UpdateReparacionDto } from './dto/update-reparacion.dto';

@Injectable()
export class ReparacionService {
  constructor(
    @InjectRepository(Reparacion)
    private readonly reparacionRepository: Repository<Reparacion>,
  ) {}

  async create(
    incidenciaId: number,
    dto: CreateReparacionDto,
  ): Promise<Reparacion> {
    const reparacion = this.reparacionRepository.create({
      ...dto,
      incidencia: { id: incidenciaId } as any,
      proveedor: { id: dto.proveedorId } as any,
    });
    return this.reparacionRepository.save(reparacion);
  }

  async update(
    id: number,
    dto: UpdateReparacionDto,
  ): Promise<Reparacion | null> {
    const exists = await this.reparacionRepository.findOne({ where: { id } });
    if (!exists) return null;
    await this.reparacionRepository.update(id, dto);
    return this.reparacionRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<Reparacion | null> {
    const reparacion = await this.reparacionRepository.findOne({
      where: { id },
    });
    if (!reparacion) return null;
    await this.reparacionRepository.delete(id);
    return reparacion;
  }

}
