import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from './proveedor.entity';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';

@Injectable()
export class ProveedorService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
  ) {}

  async create(dto: CreateProveedorDto): Promise<Proveedor> {
    const proveedor = this.proveedorRepository.create(dto);
    return this.proveedorRepository.save(proveedor);
  }

  async findAll(): Promise<Proveedor[]> {
    return this.proveedorRepository.find();
  }

  async findOne(id: number): Promise<Proveedor | null> {
    return this.proveedorRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateProveedorDto): Promise<Proveedor | null> {
    const proveedor = await this.findOne(id);
    if (!proveedor) return null;
    await this.proveedorRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Proveedor | null> {
    const proveedor = await this.findOne(id);
    if (!proveedor) return null;
    await this.proveedorRepository.delete(id);
    return proveedor;
  }
}
