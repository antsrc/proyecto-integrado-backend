import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { auditLogger } from 'src/common/loggers/audit.logger';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(dto: CreateClienteDto, user: { nombre: string }): Promise<void> {
    const cliente = this.clienteRepository.create(dto);
    const saved = await this.clienteRepository.save(cliente);
    auditLogger.info({
      action: 'CREATE_CLIENTE',
      id: saved.id,
      user: user.nombre,
      data: dto,
    });
  }

  async findAll(): Promise<(Cliente & { activo: boolean })[]> {
    const hoy = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const clientes = await this.clienteRepository
      .createQueryBuilder('cliente')
      .leftJoin(
        'alquiler_inmueble_cliente',
        'alquiler',
        'alquiler.cliente_id = cliente.id AND (alquiler.fecha_baja IS NULL OR alquiler.fecha_baja >= :hoy)',
        { hoy },
      )
      .groupBy('cliente.id')
      .addSelect(
        'CASE WHEN COUNT(alquiler.id) > 0 THEN TRUE ELSE FALSE END',
        'activo',
      )
      .getRawAndEntities();

    return clientes.entities.map((cliente, i) => ({
      ...cliente,
      activo: clientes.raw[i].activo === 1,
    }));
  }

  async findAllIdCodigo(): Promise<{ id: number; codigo: string }[]> {
    const clientes = await this.clienteRepository.find({
      select: ['id', 'codigo'],
    });
    return clientes;
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({ where: { id } });
    if (!cliente) {
      throw new NotFoundException(`No se encontró el cliente con ID ${id}`);
    }
    return cliente;
  }

  async update(
    id: number,
    dto: UpdateClienteDto,
    user: { nombre: string },
  ): Promise<void> {
    await this.clienteRepository.update(id, dto);
    auditLogger.info({
      action: 'UPDATE_CLIENTE',
      id,
      user: user.nombre,
      changes: dto,
    });
  }

  async remove(id: number, user: { nombre: string }): Promise<void> {
    const cliente = await this.findOne(id);
    await this.clienteRepository.delete(id);
    auditLogger.info({
      action: 'DELETE_CLIENTE',
      id,
      user: user.nombre,
      data: cliente,
    });
  }
}
