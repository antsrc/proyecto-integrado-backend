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

@Injectable()
export class AlquilerService {
  private readonly dirContratos = 'uploads/contratos';
  private readonly dirTmp = 'uploads/tmp';

  constructor(
    @InjectRepository(Alquiler)
    private readonly alquilerRepository: Repository<Alquiler>,
  ) {}

  async create(dto: CreateAlquilerDto, contratoTmp: string): Promise<Alquiler> {
    const rutaTmp = join(this.dirTmp, contratoTmp);
    const rutaFinal = join(this.dirContratos, `${dto.codContrato}.pdf`);

    const alquiler = this.alquilerRepository.create({
      ...dto,
      cliente: { id: dto.clienteId } as any,
      inmueble: { id: dto.inmuebleId } as any,
    });

    try {
      const saved = await this.alquilerRepository.save(alquiler);
      await fs.rename(rutaTmp, rutaFinal);
      return saved;
    } catch (error) {
      try {
        await fs.unlink(rutaTmp);
      } catch (unlinkErr) {
        console.error('Error borrando archivo temporal:', unlinkErr.message);
      }
      throw new InternalServerErrorException(
        'Error al guardar el alquiler o mover el archivo.',
      );
    }
  }

  async updateContrato(id: number, contratoTmp: string): Promise<string> {
    const alquiler = await this.findOne(id);
    if (!alquiler) {
      throw new NotFoundException('Alquiler no encontrado');
    }
    const rutaTmp = join(this.dirTmp, contratoTmp);
    const rutaFinal = join(this.dirContratos, `${alquiler.codContrato}.pdf`);
    try {
      await fs.rename(rutaTmp, rutaFinal);
      return rutaFinal;
    } catch (error) {
      console.error('Error al actualizar el contrato:', error);
      throw new InternalServerErrorException(
        'Error al actualizar el contrato.',
      );
    }
  }

  async findAll(): Promise<Alquiler[]> {
    return this.alquilerRepository
      .createQueryBuilder('alquiler')
      .leftJoin('alquiler.cliente', 'cliente')
      .leftJoin('alquiler.inmueble', 'inmueble')
      .addSelect(['cliente.id', 'cliente.nombreCompleto'])
      .addSelect(['inmueble.id', 'inmueble.codigo'])
      .getMany();
  }

  async findOne(id: number): Promise<Alquiler | null> {
    return this.alquilerRepository.findOne({
      where: { id },
    });
  }

  async exists(codContrato: string): Promise<boolean> {
    return !!(await this.alquilerRepository.findOne({
      where: { codContrato },
    }));
  }

  async findByInmueble(inmuebleId: number): Promise<Alquiler[]> {
    return this.alquilerRepository
      .createQueryBuilder('alquiler')
      .leftJoin('alquiler.cliente', 'cliente')
      .addSelect(['cliente.id', 'cliente.nombreCompleto'])
      .where('alquiler.inmueble = :inmuebleId', { inmuebleId })
      .getMany();
  }

  async findByCliente(clienteId: number): Promise<Alquiler[]> {
    return this.alquilerRepository
      .createQueryBuilder('alquiler')
      .leftJoin('alquiler.inmueble', 'inmueble')
      .addSelect(['inmueble.id', 'inmueble.codigo'])
      .where('alquiler.cliente = :clienteId', { clienteId })
      .getMany();
  }

  async update(id: number, dto: UpdateAlquilerDto): Promise<Alquiler | null> {
    const alquiler = await this.findOne(id);
    if (!alquiler) return null;
    try {
      const result = await this.alquilerRepository.update(id, dto);
      if (dto.codContrato && (result.affected ?? 0) > 0 && dto.codContrato !== alquiler.codContrato) {
        const rutaActual = join(
          this.dirContratos,
          `${alquiler.codContrato}.pdf`,
        );
        const rutaFinal = join(this.dirContratos, `${dto.codContrato}.pdf`);
        try {
          await fs.rename(rutaActual, rutaFinal);
        } catch (error) {
          console.warn(
            'No se pudo renombrar el documento del contrato:',
            error.message,
          );
        }
      }
      return this.findOne(id);
    } catch (error) {
      console.error('Error al actualizar alquiler:', error);
      throw new Error('Error actualizando el alquiler.');
    }
  }

  async remove(id: number): Promise<Alquiler | null> {
    const alquiler = await this.findOne(id);
    if (!alquiler) return null;
    await this.alquilerRepository.delete(id);
    return alquiler;
  }
}
