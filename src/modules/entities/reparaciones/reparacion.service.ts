import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reparacion } from './reparacion.entity';
import { CreateReparacionDto } from './dto/create-reparacion.dto';
import { UpdateReparacionDto } from './dto/update-reparacion.dto';
import { auditLogger } from 'src/common/loggers/audit.logger';
import { errorLogger } from 'src/common/loggers/error.logger';
import { join } from 'path';
import { promises as fs } from 'fs';
import { readdir } from 'fs/promises';

@Injectable()
export class ReparacionService {
  private readonly dirFacturas = 'uploads/facturas/reparaciones';
  private readonly dirTmp = 'uploads/tmp';

  constructor(
    @InjectRepository(Reparacion)
    private readonly reparacionRepository: Repository<Reparacion>,
  ) {}

  async create(
    dto: CreateReparacionDto,
    user: { nombre: string },
  ): Promise<void> {
    const reparacion = this.reparacionRepository.create({
      ...dto,
      incidencia: { id: dto.incidenciaId } as any,
      proveedor: { id: dto.proveedorId } as any,
    });
    const saved = await this.reparacionRepository.save(reparacion);

    auditLogger.info({
      action: 'CREATE_REPARACION',
      id: saved.id,
      user: user.nombre,
      data: dto,
    });
  }

  async updateFactura(id: number, facturaTmp: string): Promise<string> {
      const reparacion = await this.findOne(id);
      if (!reparacion) {
        throw new NotFoundException('Reparación no encontrada');
      }
      const rutaTmp = join(this.dirTmp, facturaTmp);
      const rutaFinal = join(this.dirFacturas, `${id}.pdf`);
      try {
        await fs.rename(rutaTmp, rutaFinal);
        return rutaFinal;
      } catch (error) {
        throw new InternalServerErrorException('Error al actualizar la factura', error);
      }
    }

  async update(
    id: number,
    dto: UpdateReparacionDto,
    user: { nombre: string },
  ): Promise<void> {
    await this.reparacionRepository.update(id, dto);
    auditLogger.info({
      action: 'UPDATE_REPARACION',
      id,
      user: user.nombre,
      changes: dto,
    });
  }

  async remove(id: number, user: { nombre: string }): Promise<void> {
    const reparacion = await this.findOne(id);
    await this.reparacionRepository.delete(id);

    const rutaFactura = join(this.dirFacturas, `${id}.pdf`);
    try {
      await fs.unlink(rutaFactura);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        errorLogger.error({
          message: `No se pudo borrar el PDF de la factura ${id}`,
          error: err,
        });
      }
    }
    auditLogger.info({
      action: 'DELETE_REPARACION',
      id,
      user: user.nombre,
      data: reparacion,
    });
  }

  async findOne(id: number): Promise<Reparacion> {
    const reparacion = await this.reparacionRepository
      .createQueryBuilder('reparacion')
      .leftJoin('reparacion.incidencia', 'incidencia')
      .leftJoin('reparacion.proveedor', 'proveedor')
      .addSelect(['incidencia.codigo'])
      .addSelect(['proveedor.codigo'])
      .where('reparacion.id = :id', { id })
      .getOne();
    if (!reparacion) {
      throw new NotFoundException(`No se encontró la reparación con ID ${id}`);
    }
    return reparacion;
  }

  async findAll(): Promise<Reparacion[]> {
    return this.reparacionRepository
      .createQueryBuilder('reparacion')
      .leftJoin('reparacion.incidencia', 'incidencia')
      .leftJoin('reparacion.proveedor', 'proveedor')
      .addSelect(['incidencia.codigo'])
      .addSelect(['proveedor.codigo'])
      .getMany();
  }

  async getIdsConFactura(): Promise<number[]> {
    const dir = this.dirFacturas;
    try {
      const files = await readdir(dir);
      return files
        .filter(f => /^\d+\.pdf$/.test(f))
        .map(f => Number(f.replace('.pdf', '')))
        .filter(id => !isNaN(id));
    } catch (error) {
      errorLogger.error({
        message: 'Error leyendo facturas PDF',
        error,
      });
      return [];
    }
  }
}
