import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensualidad } from './mensualidad.entity';
import { CreateMensualidadDto } from './dto/create-mensualidad.dto';
import { UpdateMensualidadDto } from './dto/update-mensualidad.dto';

@Injectable()
export class MensualidadService {
  constructor(
    @InjectRepository(Mensualidad)
    private readonly mensualidadRepository: Repository<Mensualidad>,
  ) {}

  async create(dto: CreateMensualidadDto): Promise<Mensualidad> {
    const mensualidad = this.mensualidadRepository.create({
      ...dto,
      alquiler: { id: dto.alquilerId } as any,
    });
    return this.mensualidadRepository.save(mensualidad);
  }

  async findAll(): Promise<Mensualidad[]> {
    return this.mensualidadRepository.find();
  }  

  async findOne(id: number): Promise<Mensualidad | null> {
    return this.mensualidadRepository.findOne({ where: { id } });
  }

  async findByAlquiler(alquilerId: number): Promise<Mensualidad[]> {
    return this.mensualidadRepository.find({
      where: { alquiler: { id: alquilerId } },
    });
  }  

  async findByCliente(clienteId: number): Promise<Mensualidad[]> {
    return this.mensualidadRepository
      .createQueryBuilder('mensualidad')
      .innerJoin('mensualidad.alquiler', 'alquiler')
      .innerJoin('alquiler.cliente', 'cliente')
      .where('cliente.id = :clienteId', { clienteId })
      .getMany();
  }

  async findByInmueble(inmuebleId: number): Promise<Mensualidad[]> {
    return this.mensualidadRepository
      .createQueryBuilder('mensualidad')
      .innerJoin('mensualidad.alquiler', 'alquiler')
      .innerJoin('alquiler.inmueble', 'inmueble')
      .where('inmueble.id = :inmuebleId', { inmuebleId })
      .getMany();
  }  

  async update(
    id: number,
    dto: UpdateMensualidadDto,
  ): Promise<Mensualidad | null> {
    const mensualidad = await this.findOne(id);
    if (!mensualidad) return null;
    await this.mensualidadRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Mensualidad | null> {
    const mensualidad = await this.findOne(id);
    if (!mensualidad) return null;
    await this.mensualidadRepository.delete(id);
    return mensualidad;
  }
}
