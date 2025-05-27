import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reforma } from './reforma.entity';
import { CreateReformaDto } from './dto/create-reforma.dto';
import { UpdateReformaDto } from './dto/update-reforma.dto';
import { join } from 'path';
import { promises as fs } from 'fs';
import { readdir } from 'fs/promises';
import { auditLogger } from 'src/common/loggers/audit.logger';
import { errorLogger } from 'src/common/loggers/error.logger';
import { validarFechas } from 'src/common/validators/fechas.validator';

@Injectable()
export class ReformaService {
  private readonly dirFacturas = 'uploads/facturas/reformas';
  private readonly dirTmp = 'uploads/tmp';

  constructor(
    @InjectRepository(Reforma)
    private readonly reformaRepository: Repository<Reforma>,
  ) {}

  async create(
    dto: CreateReformaDto,
    user: { nombre: string },
  ): Promise<void> {
    if (dto.fechaInicio && dto.fechaFin) {
      validarFechas(new Date(dto.fechaInicio), new Date(dto.fechaFin));
    }

    const reforma = this.reformaRepository.create({
      ...dto,
      inmueble: { id: dto.inmuebleId } as any,
      proveedor: { id: dto.proveedorId } as any,
    });

    const saved = await this.reformaRepository.save(reforma);

    auditLogger.info({
      action: 'CREATE_REFORMA',
      id: saved.id,
      user: user.nombre,
      data: dto,
    });
  }

  async updateFactura(id: number, facturaTmp: string): Promise<string> {
    const reforma = await this.findOne(id);
    if (!reforma) {
      throw new NotFoundException('Reforma no encontrada');
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

  async findAll(): Promise<Reforma[]> {
    return this.reformaRepository
      .createQueryBuilder('reforma')
      .leftJoin('reforma.inmueble', 'inmueble')
      .leftJoin('reforma.proveedor', 'proveedor')
      .addSelect(['inmueble.codigo'])
      .addSelect(['proveedor.codigo'])
      .getMany();
  }

  async findOne(id: number): Promise<Reforma> {
    const reforma = await this.reformaRepository
      .createQueryBuilder('reforma')
      .leftJoin('reforma.inmueble', 'inmueble')
      .leftJoin('reforma.proveedor', 'proveedor')
      .addSelect(['inmueble.codigo'])
      .addSelect(['proveedor.codigo'])
      .where('reforma.id = :id', { id })
      .getOne();
    if (!reforma) {
      throw new NotFoundException(`No se encontró la reforma con ID ${id}`);
    }
    return reforma;
  }

  async update(
    id: number,
    dto: UpdateReformaDto,
    user: { nombre: string },
  ): Promise<void> {
    await this.validarFechasActualizadas(id, dto);
    await this.reformaRepository.update(id, dto);
    auditLogger.info({
      action: 'UPDATE_REFORMA',
      id,
      user: user.nombre,
      changes: dto,
    });
  }

  async remove(id: number, user: { nombre: string }): Promise<void> {
    const reforma = await this.findOne(id);
    await this.reformaRepository.delete(id);

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
      action: 'DELETE_REFORMA',
      id,
      user: user.nombre,
      data: reforma,
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

  async findByInmueble(inmuebleId: number): Promise<Reforma[]> {
    return [];
  }

  async findByProveedor(proveedorId: number): Promise<Reforma[]> {
    return [];
  }

  private async validarFechasActualizadas(id: number, dto: { fechaInicio?: Date; fechaFin?: Date }) {
    let fechaInicio: Date | undefined = dto.fechaInicio;
    let fechaFin: Date | undefined = dto.fechaFin;
    if (fechaInicio === undefined || fechaFin === undefined) {
      const reforma = await this.findOne(id);
      if (fechaInicio === undefined) fechaInicio = reforma.fechaInicio;
      if (fechaFin === undefined) fechaFin = reforma.fechaFin ?? undefined;
    }
    if (fechaInicio && fechaFin) {
      validarFechas(new Date(fechaInicio), new Date(fechaFin));
    }
  }
}
