import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(dto: CreateClienteDto): Promise<Cliente> {
    const cliente = this.clienteRepository.create(dto);
    return this.clienteRepository.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  async findOne(id: number): Promise<Cliente | null> {
    return this.clienteRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateClienteDto): Promise<Cliente | null> {
    const cliente = await this.findOne(id);
    if (!cliente) return null;

    await this.clienteRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Cliente | null> {
    const cliente = await this.findOne(id);
    if (!cliente) return null;
    await this.clienteRepository.delete(id);
    return cliente;
  }
}
