import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInmuebleDto } from './dto/create-inmueble.dto';
import { UpdateInmuebleDto } from './dto/update-inmueble.dto';
import { Inmueble } from './inmueble.entity';
import { auditLogger } from 'src/common/loggers/audit.logger';

@Injectable()
export class InmuebleService {
  constructor(
    @InjectRepository(Inmueble)
    private readonly inmuebleRepository: Repository<Inmueble>,
  ) {}

  async create(
    dto: CreateInmuebleDto,
    user: { nombre: string },
  ): Promise<void> {
    const inmueble = this.inmuebleRepository.create(dto);
    const saved = await this.inmuebleRepository.save(inmueble);

    auditLogger.info({
      action: 'CREATE_INMUEBLE',
      id: saved.id,
      user: user.nombre,
      data: dto,
    });
  }

  async findAll(): Promise<Inmueble[]> {
    return this.inmuebleRepository.find();
  }

  async findAllIdCodigo(): Promise<{ id: number; codigo: string }[]> {
    const inmuebles = await this.inmuebleRepository.find({ select: ['id', 'codigo'] });
    return inmuebles;
  }

  async findOne(id: number): Promise<Inmueble> {
    const inmueble = await this.inmuebleRepository.findOne({ where: { id } });
    if (!inmueble) {
      throw new NotFoundException(`No se encontró el inmueble con ID ${id}`);
    }
    return inmueble;
  }

  async update(
    id: number,
    dto: UpdateInmuebleDto,
    user: { nombre: string },
  ): Promise<void> {
    await this.inmuebleRepository.update(id, dto);
    auditLogger.info({
      action: 'UPDATE_INMUEBLE',
      id,
      user: user.nombre,
      changes: dto,
    });
  }

  async remove(id: number, user: { nombre: string }): Promise<void> {
    const inmueble = await this.findOne(id);
    await this.inmuebleRepository.delete(id);
    auditLogger.info({
      action: 'DELETE_INMUEBLE',
      id,
      user: user.nombre,
      data: inmueble,
    });
  }
}
