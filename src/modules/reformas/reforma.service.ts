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

@Injectable()
export class ReformaService {
  private readonly dirFacturas = 'uploads/facturas/reformas';
  private readonly dirTmp = 'uploads/tmp';

  constructor(
    @InjectRepository(Reforma)
    private readonly reformaRepository: Repository<Reforma>,
  ) {}

  async create(dto: CreateReformaDto, facturaTmp: string): Promise<Reforma> {
    const rutaTmp = join(this.dirTmp, facturaTmp);
    const rutaFinal = join(this.dirFacturas, `${dto.codFactura}.pdf`);

    const reforma = this.reformaRepository.create({
      ...dto,
      inmueble: { id: dto.inmuebleId } as any,
      proveedor: { id: dto.proveedorId } as any,
    });

    try {
      const saved = await this.reformaRepository.save(reforma);
      await fs.rename(rutaTmp, rutaFinal);
      return saved;
    } catch (error) {
      try {
        await fs.unlink(rutaTmp);
      } catch (unlinkErr) {
        console.error('Error borrando archivo temporal:', unlinkErr.message);
      }
      throw new InternalServerErrorException(
        'Error al guardar la reforma o mover el archivo de factura.',
      );
    }
  }

  async updateFactura(id: number, facturaTmp: string): Promise<string> {
    const reforma = await this.findOne(id);
    if (!reforma) {
      throw new NotFoundException('Reforma no encontrada');
    }

    const rutaTmp = join(this.dirTmp, facturaTmp);
    const rutaFinal = join(this.dirFacturas, `${reforma.codFactura}.pdf`);

    try {
      await fs.rename(rutaTmp, rutaFinal);
      return rutaFinal;
    } catch (error) {
      console.error('Error al actualizar la factura:', error);
      throw new InternalServerErrorException(
        'Error al actualizar la factura de la reforma.',
      );
    }
  }

  async update(id: number, dto: UpdateReformaDto): Promise<Reforma | null> {
    const reforma = await this.findOne(id);
    if (!reforma) return null;

    try {
      const result = await this.reformaRepository.update(id, dto);
      if (
        dto.codFactura &&
        (result.affected ?? 0) > 0 &&
        dto.codFactura !== reforma.codFactura
      ) {
        const rutaActual = join(this.dirFacturas, `${reforma.codFactura}.pdf`);
        const rutaFinal = join(this.dirFacturas, `${dto.codFactura}.pdf`);

        try {
          await fs.rename(rutaActual, rutaFinal);
        } catch (error) {
          console.warn('No se pudo renombrar la factura:', error.message);
        }
      }
      return this.findOne(id);
    } catch (error) {
      console.error('Error al actualizar reforma:', error);
      throw new Error('Error actualizando la reforma.');
    }
  }

  async findAll(): Promise<Reforma[]> {
    return this.reformaRepository
      .createQueryBuilder('reforma')
      .leftJoin('reforma.inmueble', 'inmueble')
      .leftJoin('reforma.proveedor', 'proveedor')
      .addSelect(['inmueble.id', 'inmueble.codigo'])
      .addSelect(['proveedor.id', 'proveedor.nombre'])
      .getMany();
  }

  async findOne(id: number): Promise<Reforma | null> {
    return this.reformaRepository.findOne({
      where: { id },
    });
  }

  async findByInmueble(inmuebleId: number): Promise<Reforma[]> {
    return this.reformaRepository
      .createQueryBuilder('reforma')
      .leftJoin('reforma.proveedor', 'proveedor')
      .addSelect(['proveedor.id', 'proveedor.nombre'])
      .where('reforma.inmueble = :inmuebleId', { inmuebleId })
      .getMany();
  }

  async findByProveedor(proveedorId: number): Promise<Reforma[]> {
    return this.reformaRepository
      .createQueryBuilder('reforma')
      .leftJoin('reforma.inmueble', 'inmueble')
      .addSelect(['inmueble.id', 'inmueble.codigo'])
      .where('reforma.proveedor = :proveedorId', { proveedorId })
      .getMany();
  }

  async remove(id: number): Promise<Reforma | null> {
    const reforma = await this.findOne(id);
    if (!reforma) return null;
    await this.reformaRepository.delete(id);
    return reforma;
  }
}
