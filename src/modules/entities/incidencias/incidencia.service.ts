import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incidencia } from './incidencia.entity';
import { CreateIncidenciaDto } from './dto/create-incidencia.dto';
import { UpdateIncidenciaDto } from './dto/update-incidencia.dto';
import { auditLogger } from 'src/common/loggers/audit.logger';

@Injectable()
export class IncidenciaService {
  constructor(
    @InjectRepository(Incidencia)
    private readonly incidenciaRepository: Repository<Incidencia>,
  ) {}

  async create(dto: CreateIncidenciaDto, user: { nombre: string }): Promise<void> {
    const incidencia = this.incidenciaRepository.create({
      ...dto,
      alquiler: { id: dto.alquilerId } as any,
      fechaRegistro: new Date(),
    });
    const saved = await this.incidenciaRepository.save(incidencia);
    auditLogger.info({
      action: 'CREATE_INCIDENCIA',
      id: saved.id,
      user: user.nombre,
      data: dto,
    });
  }

  async findAll(): Promise<any[]> {
    const incidencias = await this.incidenciaRepository
      .createQueryBuilder('incidencia')
      .leftJoin('incidencia.reparacion', 'reparacion')
      .leftJoin('incidencia.alquiler', 'alquiler')
      .leftJoin('alquiler.cliente', 'cliente')
      .leftJoin('alquiler.inmueble', 'inmueble')
      .addSelect(['reparacion.id'])
      .addSelect(['alquiler.codigo'])
      .addSelect(['cliente.codigo'])
      .addSelect(['inmueble.codigo'])
      .getMany();
    return incidencias.map(({ proveedorAvisado, reparacion, ...rest }) => ({
      ...rest,
      reparada: !!reparacion,
    }));
  }

  async findOne(id: number): Promise<Incidencia> {
    const incidencia = await this.incidenciaRepository
      .createQueryBuilder('incidencia')
      .leftJoin('incidencia.alquiler', 'alquiler')
      .addSelect(['alquiler.codigo'])
      .where('incidencia.id = :id', { id })
      .getOne();
    if (!incidencia) {
      throw new NotFoundException(`No se encontró la incidencia con ID ${id}`);
    }
    return incidencia;
  }

  async findByCliente(clienteId: number): Promise<Incidencia[]> {
    return [];
  }

  async findByInmueble(inmuebleId: number): Promise<Incidencia[]> {
    return [];
  }

  async update(
    id: number,
    dto: UpdateIncidenciaDto,
    user: { nombre: string },
  ): Promise<void> {
    const updateData: any = { ...dto };
    if ('proveedorAvisadoId' in updateData) {
      updateData.proveedorAvisado = updateData.proveedorAvisadoId != null ? { id: updateData.proveedorAvisadoId } as any : null;
      delete updateData.proveedorAvisadoId;
    }
    await this.incidenciaRepository.update(id, updateData);
    auditLogger.info({
      action: 'UPDATE_INCIDENCIA',
      id,
      user: user.nombre,
      changes: dto,
    });
  }

  async remove(id: number, user: { nombre: string }): Promise<void> {
    await this.incidenciaRepository.delete(id);
    auditLogger.info({
      action: 'DELETE_INCIDENCIA',
      id,
      user: user.nombre,
    });
  }

  async findAllActiveIdCodigo(): Promise<{ id: number; codigo: string }[]> {
    const incidencias = await this.incidenciaRepository
      .createQueryBuilder('incidencia')
      .select(['incidencia.id', 'incidencia.codigo'])
      .where('incidencia.id NOT IN (SELECT reparacion.incidencia_id FROM reparacion)')
      .getMany();
    return incidencias;
  }
}
