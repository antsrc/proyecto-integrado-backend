import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensualidad } from './mensualidad.entity';
import { CreateMensualidadDto } from './dto/create-mensualidad.dto';
import { UpdateMensualidadDto } from './dto/update-mensualidad.dto';
import { validarFechas } from 'src/common/validators/fechas.validator';
import { join } from 'path';
import { promises as fs } from 'fs';
import { auditLogger } from 'src/common/loggers/audit.logger';
import { errorLogger } from 'src/common/loggers/error.logger';
import { readdir } from 'fs/promises';
import { Cliente } from '../clientes/cliente.entity';
import { Alquiler } from '../alquileres/alquiler.entity';

@Injectable()
export class MensualidadService {
  private readonly dirFacturas = 'uploads/facturas/mensualidades';
  private readonly dirTmp = 'uploads/tmp';

  constructor(
    @InjectRepository(Mensualidad)
    private readonly mensualidadRepository: Repository<Mensualidad>,
    @InjectRepository(Alquiler)
    private readonly alquilerRepository: Repository<Alquiler>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(
    dto: CreateMensualidadDto,
    user: { nombre: string },
  ): Promise<void> {
    if (dto.fechaFin && dto.fechaInicio) {
      await this.validarFechasMensualidad(dto.alquilerId, {
        fechaInicio: new Date(dto.fechaInicio),
        fechaFin: new Date(dto.fechaFin),
      });
    }
    this.validarFechaPagoVsEmision({ fechaEmision: dto.fechaEmision, fechaPago: dto.fechaPago });
    const mensualidad = this.mensualidadRepository.create({
      ...dto,
      alquiler: { id: dto.alquilerId } as any,
    });
    const saved = await this.mensualidadRepository.save(mensualidad);
    if (!dto.fechaPago) {
      const alquiler = await this.alquilerRepository.findOne({
        where: { id: dto.alquilerId },
        relations: ['cliente'],
      });
      const clienteId = alquiler?.cliente?.id;
      if (clienteId) {
        await this.actualizarDeudaCliente(clienteId, dto.importe);
      }
    }

    auditLogger.info({
      action: 'CREATE_MENSUALIDAD',
      id: saved.id,
      user: user.nombre,
      data: dto,
    });
  }

  async updateFactura(id: number, facturaTmp: string): Promise<string> {
    const mensualidad = await this.findOne(id);
    if (!mensualidad) {
      throw new NotFoundException('Mensualidad no encontrada');
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

  async findAll(): Promise<Mensualidad[]> {
    return this.mensualidadRepository
      .createQueryBuilder('mensualidad')
      .leftJoin('mensualidad.alquiler', 'alquiler')
      .leftJoin('alquiler.cliente', 'cliente')
      .leftJoin('alquiler.inmueble', 'inmueble')
      .addSelect(['alquiler.codigo'])
      .addSelect(['cliente.codigo'])
      .addSelect(['inmueble.codigo'])
      .getMany();
  }

  async findOne(id: number): Promise<Mensualidad> {
    const mensualidad = await this.mensualidadRepository
      .createQueryBuilder('mensualidad')
      .leftJoin('mensualidad.alquiler', 'alquiler')
      .addSelect(['alquiler.codigo'])
      .where('mensualidad.id = :id', { id })
      .getOne();
    if (!mensualidad) {
      throw new NotFoundException(`No se encontró la mensualidad con ID ${id}`);
    }
    return mensualidad;
  }

  async update(
    id: number,
    dto: UpdateMensualidadDto,
    user: { nombre: string },
  ): Promise<void> {
    const mensualidadOriginal = await this.mensualidadRepository.findOne({
      where: { id },
      relations: ['alquiler', 'alquiler.cliente'],
    });
    if (!mensualidadOriginal) {
      throw new NotFoundException('Mensualidad no encontrada');
    }
    this.validarFechaPagoVsEmision({ fechaEmision: mensualidadOriginal.fechaEmision, fechaPago: dto.fechaPago });
    await this.mensualidadRepository.update(id, dto);
    auditLogger.info({
      action: 'UPDATE_MENSUALIDAD',
      id,
      user: user.nombre,
      changes: dto,
    });
    if (!mensualidadOriginal.fechaPago && dto.fechaPago) {
      const clienteId = mensualidadOriginal.alquiler?.cliente?.id;
      if (clienteId) {
        await this.actualizarDeudaCliente(clienteId, -mensualidadOriginal.importe);
      }
    }
    if (mensualidadOriginal.fechaPago && dto.fechaPago === null) {
      const clienteId = mensualidadOriginal.alquiler?.cliente?.id;
      if (clienteId) {
        await this.actualizarDeudaCliente(clienteId, mensualidadOriginal.importe);
      }
    }
  }

  async remove(id: number, user: { nombre: string }): Promise<void> {
    const mensualidad = await this.mensualidadRepository.findOne({
      where: { id },
      relations: ['alquiler', 'alquiler.cliente'],
    });
    if (!mensualidad) {
      throw new NotFoundException('Mensualidad no encontrada');
    }
    await this.mensualidadRepository.delete(id);
    if (!mensualidad.fechaPago && mensualidad.alquiler?.cliente) {
      const clienteId = mensualidad.alquiler.cliente.id;
      if (clienteId) {
        await this.actualizarDeudaCliente(clienteId, -mensualidad.importe);
      }
    }

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
      action: 'DELETE_MENSUALIDAD',
      id,
      user: user.nombre,
      data: mensualidad,
    });
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

  private async validarFechasMensualidad(alquilerId: number, dto: { fechaInicio?: Date; fechaFin?: Date }) {
    if (dto.fechaFin && dto.fechaInicio) {
      validarFechas(new Date(dto.fechaInicio), new Date(dto.fechaFin));
      const alquiler = await this.alquilerRepository.findOne({ where: { id: alquilerId } });
      if (!alquiler) {
        throw new NotFoundException('No se encontró el alquiler asociado');
      }
      const inicio = new Date(dto.fechaInicio);
      const fin = new Date(dto.fechaFin);
      const alta = new Date(alquiler.fechaAlta);
      const baja = alquiler.fechaBaja ? new Date(alquiler.fechaBaja) : null;
      const fueraDeRango = (fecha: Date) => fecha < alta || (baja && fecha > baja);
      if (fueraDeRango(inicio) || fueraDeRango(fin)) {
        throw new BadRequestException('Las fechas de la mensualidad no están dentro del alquiler');
      }
      const solapadas = await this.mensualidadRepository.createQueryBuilder('m')
        .where('m.alquiler = :alquilerId', { alquilerId })
        .andWhere('((:inicio BETWEEN m.fechaInicio AND m.fechaFin) OR (:fin BETWEEN m.fechaInicio AND m.fechaFin) OR (m.fechaInicio BETWEEN :inicio AND :fin))')
        .setParameters({ inicio, fin })
        .getCount();
      if (solapadas > 0) {
        throw new BadRequestException('Las fechas se solapan con otra mensualidad existente para este alquiler');
      }
    }
  }

  private validarFechaPagoVsEmision(dto: { fechaEmision?: Date; fechaPago?: Date }) {
    if (dto.fechaPago && dto.fechaEmision) {
      const pago = new Date(dto.fechaPago);
      const emision = new Date(dto.fechaEmision);
      if (pago < emision) {
        throw new BadRequestException('La fecha de pago no puede ser anterior a la fecha de emisión');
      }
    }
  }

  private async actualizarDeudaCliente(clienteId: number, cantidad: number): Promise<void> {
    const cliente = await this.clienteRepository.findOne({ where: { id: clienteId } });
    if (!cliente) {
      throw new InternalServerErrorException('No se pudo actualizar la deuda del cliente');
    }
    cliente.deuda = Number(cliente.deuda || 0) + Number(cantidad);
    await this.clienteRepository.save(cliente);
  }
}

