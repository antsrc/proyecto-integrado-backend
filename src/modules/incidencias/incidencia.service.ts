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
    return this.incidenciaRepository
      .createQueryBuilder('incidencia')
      .leftJoin('incidencia.proveedorAvisado', 'proveedorAvisado')
      .leftJoinAndSelect('incidencia.reparacion', 'reparacion')
      .leftJoin('reparacion.proveedor', 'proveedorReparacion')
      .leftJoin('incidencia.alquiler', 'alquiler')
      .leftJoin('alquiler.cliente', 'cliente')
      .leftJoin('alquiler.inmueble', 'inmueble')
      .addSelect(['proveedorAvisado.id', 'proveedorAvisado.nombre'])
      .addSelect(['proveedorReparacion.id', 'proveedorReparacion.nombre'])
      .addSelect(['alquiler.id', 'alquiler.codContrato'])
      .addSelect(['cliente.id', 'cliente.nombreCompleto'])
      .addSelect(['inmueble.id', 'inmueble.codigo'])
      .getMany();
  }

  async findOne(id: number): Promise<Incidencia | null> {
    return this.incidenciaRepository.findOne({ where: { id } });
  }

  async findByCliente(clienteId: number): Promise<Incidencia[]> {
    return this.incidenciaRepository
      .createQueryBuilder('incidencia')
      .leftJoin('incidencia.proveedorAvisado', 'proveedorAvisado')
      .leftJoinAndSelect('incidencia.reparacion', 'reparacion')
      .leftJoin('reparacion.proveedor', 'proveedorReparacion')
      .leftJoin('incidencia.alquiler', 'alquiler')
      .leftJoin('alquiler.cliente', 'cliente')
      .leftJoin('alquiler.inmueble', 'inmueble')
      .where('cliente.id = :clienteId', { clienteId })
      .addSelect(['proveedorAvisado.id', 'proveedorAvisado.nombre'])
      .addSelect(['proveedorReparacion.id', 'proveedorReparacion.nombre'])
      .addSelect(['alquiler.id', 'alquiler.codContrato'])
      .addSelect(['cliente.id', 'cliente.nombreCompleto'])
      .addSelect(['inmueble.id', 'inmueble.codigo'])
      .getMany();
  }

  async findByInmueble(inmuebleId: number): Promise<Incidencia[]> {
    return this.incidenciaRepository
      .createQueryBuilder('incidencia')
      .leftJoin('incidencia.proveedorAvisado', 'proveedorAvisado')
      .leftJoinAndSelect('incidencia.reparacion', 'reparacion')
      .leftJoin('reparacion.proveedor', 'proveedorReparacion')
      .leftJoin('incidencia.alquiler', 'alquiler')
      .leftJoin('alquiler.cliente', 'cliente')
      .leftJoin('alquiler.inmueble', 'inmueble')
      .where('inmueble.id = :inmuebleId', { inmuebleId })
      .addSelect(['proveedorAvisado.id', 'proveedorAvisado.nombre'])
      .addSelect(['proveedorReparacion.id', 'proveedorReparacion.nombre'])
      .addSelect(['alquiler.id', 'alquiler.codContrato'])
      .addSelect(['cliente.id', 'cliente.nombreCompleto'])
      .addSelect(['inmueble.id', 'inmueble.codigo'])
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
