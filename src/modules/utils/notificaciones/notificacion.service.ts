import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensualidad } from '../../entities/mensualidades/mensualidad.entity';
import { Alquiler } from '../../entities/alquileres/alquiler.entity';
import { Incidencia } from '../../entities/incidencias/incidencia.entity';
import { Reforma } from '../../entities/reformas/reforma.entity';
import { Reparacion } from '../../entities/reparaciones/reparacion.entity';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { errorLogger } from 'src/common/loggers/error.logger';

@Injectable()
export class NotificacionService {
  constructor(
    @InjectRepository(Mensualidad)
    private readonly mensualidadRepository: Repository<Mensualidad>,
    @InjectRepository(Alquiler)
    private readonly alquilerRepository: Repository<Alquiler>,
    @InjectRepository(Incidencia)
    private readonly incidenciaRepository: Repository<Incidencia>,
    @InjectRepository(Reforma)
    private readonly reformaRepository: Repository<Reforma>,
    @InjectRepository(Reparacion)
    private readonly reparacionRepository: Repository<Reparacion>,
  ) {}

  private async getMensualidadesSinPagar(): Promise<{ codigo: string; count: number }[]> {
    const result = await this.mensualidadRepository
      .createQueryBuilder('mensualidad')
      .leftJoin('mensualidad.alquiler', 'alquiler')
      .select('alquiler.codigo', 'codigo')
      .addSelect('COUNT(mensualidad.id)', 'count')
      .where('mensualidad.fechaPago IS NULL')
      .groupBy('alquiler.codigo')
      .having('COUNT(mensualidad.id) > 0')
      .getRawMany();
    return result.map(r => ({ codigo: r.codigo, count: Number(r.count) }));
  }

  private async getAlquileresFinalizando(): Promise<{ codigo: string; fechaBaja: Date | null }[]> {
    const hoy = new Date();
    const fechaCorte = new Date(hoy);
    fechaCorte.setMonth(hoy.getMonth() + 3);

    const alquileres = await this.alquilerRepository
      .createQueryBuilder('alquiler')
      .select(['alquiler.codigo', 'alquiler.fechaBaja'])
      .where('alquiler.fechaBaja IS NOT NULL')
      .andWhere('alquiler.fechaBaja BETWEEN :hoy AND :fechaCorte', {
        hoy,
        fechaCorte,
      })
      .getMany();
    return alquileres;
  }

  private async getIncidenciasActivas(): Promise<{ id: number; codigo: string; proveedorAvisadoId: number }[]> {
    const result = await this.incidenciaRepository
      .createQueryBuilder('incidencia')
      .leftJoin('incidencia.proveedorAvisado', 'proveedor')
      .select(['incidencia.id AS id', 'incidencia.codigo AS codigo', 'proveedor.id AS proveedorAvisadoId'])
      .where(qb => {
        const subQuery = qb.subQuery()
          .select('reparacion.incidencia_id')
          .from('reparacion', 'reparacion')
          .getQuery();
        return 'incidencia.id NOT IN ' + subQuery;
      })
      .getRawMany();
    return result.map(r => ({ id: r.id, codigo: r.codigo, proveedorAvisadoId: r.proveedorAvisadoId }));
  }

  async getAlquileresSinContratoCount(): Promise<number> {
    const dirContratos = 'uploads/contratos';
    let idsConContrato: number[] = [];
    try {
      const files = await readdir(dirContratos);
      idsConContrato = files
        .filter(f => /^\d+\.pdf$/.test(f))
        .map(f => Number(f.replace('.pdf', '')))
        .filter(id => !isNaN(id));
    } catch (error) {
      errorLogger.error({
        message: 'Error leyendo contratos PDF',
        error,
      });
    }
    if (idsConContrato.length === 0) {
      const allCount = await this.alquilerRepository
        .createQueryBuilder('alquiler')
        .getCount();
      return allCount;
    }
    const count = await this.alquilerRepository
      .createQueryBuilder('alquiler')
      .where('alquiler.id NOT IN (:...ids)', { ids: idsConContrato })
      .getCount();
    return count;
  }

  async getReformasSinFacturaCount(): Promise<number> {
    const dirFacturas = 'uploads/facturas/reformas';
    let idsConFactura: number[] = [];
    try {
      const files = await readdir(dirFacturas);
      idsConFactura = files
        .filter(f => /^\d+\.pdf$/.test(f))
        .map(f => Number(f.replace('.pdf', '')))
        .filter(id => !isNaN(id));
    } catch (error) {
      errorLogger.error({
        message: 'Error leyendo facturas PDF de reformas',
        error,
      });
    }
    if (idsConFactura.length === 0) {
      const allCount = await this.reformaRepository
        .createQueryBuilder('reforma')
        .getCount();
      return allCount;
    }
    const count = await this.reformaRepository
      .createQueryBuilder('reforma')
      .where('reforma.id NOT IN (:...ids)', { ids: idsConFactura })
      .getCount();
    return count;
  }

  async getReparacionesSinFacturaCount(): Promise<number> {
    const dirFacturas = 'uploads/facturas/reparaciones';
    let idsConFactura: number[] = [];
    try {
      const files = await readdir(dirFacturas);
      idsConFactura = files
        .filter(f => /^\d+\.pdf$/.test(f))
        .map(f => Number(f.replace('.pdf', '')))
        .filter(id => !isNaN(id));
    } catch (error) {
      errorLogger.error({
        message: 'Error leyendo facturas PDF de reparaciones',
        error,
      });
    }
    if (idsConFactura.length === 0) {
      const allCount = await this.reparacionRepository
        .createQueryBuilder('reparacion')
        .getCount();
      return allCount;
    }
    const count = await this.reparacionRepository
      .createQueryBuilder('reparacion')
      .where('reparacion.id NOT IN (:...ids)', { ids: idsConFactura })
      .getCount();
    return count;
  }

  async getNumMensualidadesSinFactura(): Promise<number> {
    const dirFacturas = 'uploads/facturas/mensualidades';
    let idsConFactura: number[] = [];
    try {
      const files = await readdir(dirFacturas);
      idsConFactura = files
        .filter(f => /^\d+\.pdf$/.test(f))
        .map(f => Number(f.replace('.pdf', '')))
        .filter(id => !isNaN(id));
    } catch (error) {
      errorLogger.error({
        message: 'Error leyendo facturas PDF de mensualidades',
        error,
      });
    }
    if (idsConFactura.length === 0) {
      const allCount = await this.mensualidadRepository
        .createQueryBuilder('mensualidad')
        .getCount();
      return allCount;
    }
    const count = await this.mensualidadRepository
      .createQueryBuilder('mensualidad')
      .where('mensualidad.id NOT IN (:...ids)', { ids: idsConFactura })
      .getCount();
    return count;
  }

  async getNotificaciones() {
    const [mensualidadesSinPagar, alquileresFinalizando, incidenciasActivas, alquileresSinContrato, reformasSinFactura, reparacionesSinFactura, mensualidadesSinFactura] = await Promise.all([
      this.getMensualidadesSinPagar(),
      this.getAlquileresFinalizando(),
      this.getIncidenciasActivas(),
      this.getAlquileresSinContratoCount(),
      this.getReformasSinFacturaCount(),
      this.getReparacionesSinFacturaCount(),
      this.getNumMensualidadesSinFactura(),
    ]);
    return {
      mensualidadesSinPagar,
      alquileresFinalizando,
      incidenciasActivas,
      registrosSinDocumento: {
        alquileres: alquileresSinContrato,
        reformas: reformasSinFactura,
        reparaciones: reparacionesSinFactura,
        mensualidades: mensualidadesSinFactura
      }
    };
  }
}
