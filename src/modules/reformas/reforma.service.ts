import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reforma } from './reforma.entity';
import { CreateReformaDto } from './dto/create-reforma.dto';
import { UpdateReformaDto } from './dto/update-reforma.dto';

@Injectable()
export class ReformaService {
  constructor(
    @InjectRepository(Reforma)
    private readonly reformaRepository: Repository<Reforma>,
  ) {}

  async create(dto: CreateReformaDto): Promise<Reforma> {
    const reforma = this.reformaRepository.create({
      ...dto,
      inmueble: { id: dto.inmuebleId } as any,
      proveedor: { id: dto.proveedorId } as any,
    });

    return this.reformaRepository.save(reforma);
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
    return this.reformaRepository.findOne({ where: { id } });
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

  async update(id: number, dto: UpdateReformaDto): Promise<Reforma | null> {
    const reforma = await this.findOne(id);
    if (!reforma) return null;

    await this.reformaRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Reforma | null> {
    const reforma = await this.findOne(id);
    if (!reforma) return null;
    await this.reformaRepository.delete(id);
    return reforma;
  }
}
