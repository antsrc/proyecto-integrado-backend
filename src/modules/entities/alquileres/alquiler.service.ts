import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alquiler } from './alquiler.entity';
import { CreateAlquilerDto } from './dto/create-alquiler.dto';
import { UpdateAlquilerDto } from './dto/update-alquiler.dto';
import { join } from 'path';
import { promises as fs } from 'fs';
import { auditLogger } from 'src/common/loggers/audit.logger';
import { errorLogger } from 'src/common/loggers/error.logger';
import { validarFechas } from 'src/common/validators/fechas.validator';
import { readdir } from 'fs/promises';

@Injectable()
export class AlquilerService {
  private readonly dirContratos = 'uploads/contratos';
  private readonly dirTmp = 'uploads/tmp';

  constructor(
    @InjectRepository(Alquiler)
    private readonly alquilerRepository: Repository<Alquiler>,
  ) {}

  async create(
    dto: CreateAlquilerDto,
    user: { nombre: string },
  ): Promise<void> {
    if (dto.fechaBaja && dto.fechaAlta) {
      validarFechas(new Date(dto.fechaAlta), new Date(dto.fechaBaja));
    }
    const alquiler = this.alquilerRepository.create({
      ...dto,
      cliente: { id: dto.clienteId } as any,
      inmueble: { id: dto.inmuebleId } as any,
    });
    const saved = await this.alquilerRepository.save(alquiler);

    auditLogger.info({
      action: 'CREATE_ALQUILER',
      id: saved.id,
      user: user.nombre,
      data: dto,
    });
  }

  async updateContrato(id: number, contratoTmp: string): Promise<string> {
    const alquiler = await this.findOne(id);
    if (!alquiler) {
      throw new NotFoundException('Alquiler no encontrado');
    }
    const rutaTmp = join(this.dirTmp, contratoTmp);
    const rutaFinal = join(this.dirContratos, `${id}.pdf`);
    try {
      await fs.rename(rutaTmp, rutaFinal);
      return rutaFinal;
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar el contrato', error);
    }
  }

  async findAll(): Promise<Alquiler[]> {
    return this.alquilerRepository
      .createQueryBuilder('alquiler')
      .leftJoin('alquiler.cliente', 'cliente')
      .leftJoin('alquiler.inmueble', 'inmueble')
      .addSelect(['cliente.codigo'])
      .addSelect(['inmueble.codigo'])
      .getMany();
  }

  async findAllActiveIdCodigo(): Promise<{ id: number; codigo: string }[]> {
    const hoy = new Date().toISOString().split('T')[0];
    const alquileres = await this.alquilerRepository.createQueryBuilder('alquiler')
      .select(['alquiler.id', 'alquiler.codigo'])
      .where('alquiler.fecha_baja IS NULL OR alquiler.fecha_baja >= :hoy', { hoy })
      .getMany();
    return alquileres;
  }

  async findOne(id: number): Promise<Alquiler> {
    const alquiler = await this.alquilerRepository
      .createQueryBuilder('alquiler')
      .leftJoin('alquiler.cliente', 'cliente')
      .leftJoin('alquiler.inmueble', 'inmueble')
      .addSelect(['cliente.codigo'])
      .addSelect(['inmueble.codigo'])
      .where('alquiler.id = :id', { id })
      .getOne();
    if (!alquiler) {
      throw new NotFoundException(`No se encontró el alquiler con ID ${id}`);
    }
    return alquiler;
  }

  async findByInmueble(inmuebleId: number): Promise<Alquiler[]> {
    // return this.alquilerRepository
    //   .createQueryBuilder('alquiler')
    //   .leftJoin('alquiler.cliente', 'cliente')
    //   .addSelect(['cliente.id', 'cliente.codigo'])
    //   .where('alquiler.inmueble = :inmuebleId', { inmuebleId })
    //   .getMany();
    return []
  }

  async findByCliente(clienteId: number): Promise<Alquiler[]> {
    // return this.alquilerRepository
    //   .createQueryBuilder('alquiler')
    //   .leftJoin('alquiler.inmueble', 'inmueble')
    //   .addSelect(['inmueble.id', 'inmueble.codigo'])
    //   .where('alquiler.cliente = :clienteId', { clienteId })
    //   .getMany();
    return []
  }

  async update(
    id: number,
    dto: UpdateAlquilerDto,
    user: { nombre: string },
  ): Promise<void> {
    await this.validarFechasActualizadas(id, dto);
    await this.alquilerRepository.update(id, dto);
    auditLogger.info({
      action: 'UPDATE_ALQUILER',
      id,
      user: user.nombre,
      changes: dto,
    });
  }

  async remove(id: number, user: { nombre: string }): Promise<void> {
    const alquiler = await this.findOne(id);
    await this.alquilerRepository.delete(id);

    const rutaContrato = join(this.dirContratos, `${id}.pdf`);
    try {
      await fs.unlink(rutaContrato);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        errorLogger.error({
          message: `No se pudo borrar el PDF del contrato ${id}`,
          error: err,
        });
      }
    }
    auditLogger.info({
      action: 'DELETE_ALQUILER',
      id,
      user: user.nombre,
      data: alquiler,
    });
  }

  async getIdsConContrato(): Promise<number[]> {
    const dir = this.dirContratos;
    try {
      const files = await readdir(dir);
      return files
        .filter(f => /^\d+\.pdf$/.test(f))
        .map(f => Number(f.replace('.pdf', '')))
        .filter(id => !isNaN(id));
    } catch (error) {
      errorLogger.error({
        message: 'Error leyendo contratos PDF',
        error,
      });
      return [];
    }
  }

  private async validarFechasActualizadas(id: number, dto: { fechaAlta?: Date; fechaBaja?: Date }) {
    let fechaAlta: Date | undefined = dto.fechaAlta;
    let fechaBaja: Date | undefined = dto.fechaBaja;
    if (fechaAlta === undefined || fechaBaja === undefined) {
      const alquiler = await this.findOne(id);
      if (fechaAlta === undefined) fechaAlta = alquiler.fechaAlta;
      if (fechaBaja === undefined) fechaBaja = alquiler.fechaBaja ?? undefined;
    }
    if (fechaBaja && fechaAlta) {
      validarFechas(new Date(fechaAlta), new Date(fechaBaja));
    }
  }
}
