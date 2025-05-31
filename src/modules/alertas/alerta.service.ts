import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensualidad } from '../mensualidades/mensualidad.entity';

@Injectable()
export class AlertaService {
  constructor(
    @InjectRepository(Mensualidad)
    private readonly mensualidadRepository: Repository<Mensualidad>,
  ) {}

  async findMensualidadesSinPagar(): Promise<{ codigo: string; fechaEmision: Date }[]> {
    const result = await this.mensualidadRepository
      .createQueryBuilder('mensualidad')
      .leftJoin('mensualidad.alquiler', 'alquiler')
      .select(['alquiler.codigo AS codigo', 'mensualidad.fechaEmision AS fechaEmision'])
      .where('mensualidad.fechaPago IS NULL')
      .getRawMany();
    return result.map(r => ({ codigo: r.codigo, fechaEmision: r.fechaEmision }));
  }

  async findAlquileresFinalizando(): Promise<{ codigo: string; fechaBaja: Date }[]> {
    const hoy = new Date();
    const fechaCorte = new Date(hoy);
    fechaCorte.setMonth(hoy.getMonth() + 3);

    const result = await this.mensualidadRepository.manager
      .getRepository('alquiler_inmueble_cliente')
      .createQueryBuilder('alquiler')
      .select(['alquiler.codigo AS codigo', 'alquiler.fechaBaja AS fechaBaja'])
      .where('alquiler.fechaBaja IS NOT NULL')
      .andWhere('alquiler.fechaBaja BETWEEN :hoy AND :fechaCorte', {
        hoy: hoy.toISOString().slice(0, 10),
        fechaCorte: fechaCorte.toISOString().slice(0, 10),
      })
      .getRawMany();
    return result.map(r => ({ codigo: r.codigo, fechaBaja: r.fechaBaja }));
  }

  async findIncidenciasActivas(): Promise<{ codigo: string; proveedorAvisado: string }[]> {
    const result = await this.mensualidadRepository.manager
      .getRepository('incidencia')
      .createQueryBuilder('incidencia')
      .select(['incidencia.codigo AS codigo', 'incidencia.proveedorAvisado AS proveedorAvisado'])
      .where(qb => {
        const subQuery = qb.subQuery()
          .select('reparacion.incidenciaId')
          .from('reparacion', 'reparacion')
          .getQuery();
        return 'incidencia.id NOT IN ' + subQuery;
      })
      .getRawMany();
    return result.map(r => ({ codigo: r.codigo, proveedorAvisado: r.proveedorAvisado }));
  }
}
