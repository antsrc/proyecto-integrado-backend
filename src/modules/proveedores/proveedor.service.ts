import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from './proveedor.entity';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { auditLogger } from 'src/common/loggers/audit.logger';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ProveedorService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
  ) {}

  async create(dto: CreateProveedorDto, user: { nombre: string }): Promise<void> {
    const proveedor = this.proveedorRepository.create(dto);
    const saved = await this.proveedorRepository.save(proveedor);
    auditLogger.info({
      action: 'CREATE_PROVEEDOR',
      id: saved.id,
      user: user.nombre,
      data: dto,
    });
  }

  async findAll(): Promise<Proveedor[]> {
    return this.proveedorRepository.find();
  }

  async findAllIdCodigo(): Promise<{ id: number; codigo: string }[]> {
    const proveedores = await this.proveedorRepository.find({
      select: ['id', 'codigo'],
    });
    return proveedores;
  }

  async findOne(id: number): Promise<Proveedor> {
    const proveedor = await this.proveedorRepository.findOne({ where: { id } });
    if (!proveedor) {
      throw new NotFoundException(`No se encontró el proveedor con ID ${id}`);
    }
    return proveedor;
  }

  async update(id: number, dto: UpdateProveedorDto, user: { nombre: string }): Promise<void> {
    await this.proveedorRepository.update(id, dto);
    auditLogger.info({
      action: 'UPDATE_PROVEEDOR',
      id,
      user: user.nombre,
      changes: dto,
    });
  }

  async remove(id: number, user: { nombre: string }): Promise<void> {
    const proveedor = await this.findOne(id);
    await this.proveedorRepository.delete(id);
    auditLogger.info({
      action: 'DELETE_PROVEEDOR',
      id,
      user: user.nombre,
      data: proveedor,
    });
  }
}
