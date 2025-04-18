import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incidencia } from './incidencia.entity';
import { CreateIncidenciaDto } from './dto/create-incidencia.dto';
import { UpdateIncidenciaDto } from './dto/update-incidencia.dto';

@Injectable()
export class IncidenciaService {
  constructor(
    @InjectRepository(Incidencia)
    private readonly incidenciaRepository: Repository<Incidencia>,
  ) {}

  async create(dto: CreateIncidenciaDto): Promise<Incidencia> {
    const incidencia = this.incidenciaRepository.create({
      descripcion: dto.descripcion,
      fechaRegistro: new Date(),
      alquiler: { id: dto.alquilerId } as any,
      tipo: { id: dto.tipoId } as any,
      proveedorAvisado: dto.proveedorAvisadoId
        ? ({ id: dto.proveedorAvisadoId } as any)
        : null,
    });
    return this.incidenciaRepository.save(incidencia);
  }

  async findAll(): Promise<Incidencia[]> {
    return this.incidenciaRepository.find();
  }

  async findOne(id: number): Promise<Incidencia | null> {
    return this.incidenciaRepository.findOne({ where: { id } });
  }

  async findByCliente(clienteId: number): Promise<Incidencia[]> {
    return this.incidenciaRepository
      .createQueryBuilder('incidencia')
      .innerJoin('incidencia.alquiler', 'alquiler')
      .innerJoin('alquiler.cliente', 'cliente')
      .where('cliente.id = :clienteId', { clienteId })
      .getMany();
  }

  async update(
    id: number,
    dto: UpdateIncidenciaDto,
  ): Promise<Incidencia | null> {
    const incidencia = await this.findOne(id);
    if (!incidencia) return null;
    await this.incidenciaRepository.update(id, {
      proveedorAvisado: dto.proveedorAvisadoId
        ? ({ id: dto.proveedorAvisadoId } as any)
        : null,
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<Incidencia | null> {
    const incidencia = await this.findOne(id);
    if (!incidencia) return null;
    await this.incidenciaRepository.delete(id);
    return incidencia;
  }
}
