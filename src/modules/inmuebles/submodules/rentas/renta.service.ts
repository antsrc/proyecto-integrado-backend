import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Renta } from './renta.entity';
import { CreateRentaDto } from './dto/create-renta.dto';
import { UpdateRentaDto } from './dto/update-renta.dto';

@Injectable()
export class RentaService {
  constructor(
    @InjectRepository(Renta)
    private readonly rentaRepository: Repository<Renta>,
  ) {}

  async create(
    inmuebleId: number,
    createRentaDto: CreateRentaDto,
  ): Promise<Renta | null> {
    const renta = this.rentaRepository.create({
      ...createRentaDto,
      inmueble: { id: inmuebleId } as any,
    });
    const saved = await this.rentaRepository.save(renta);
    return this.findOne(saved.id);
  }

  async findAll(inmuebleId: number): Promise<Renta[]> {
    return this.rentaRepository.find({
      where: { inmueble: { id: inmuebleId } },
    });
  }

  async findOne(id: number): Promise<Renta | null> {
    return this.rentaRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateRentaDto): Promise<Renta | null> {
    const renta = await this.findOne(id);
    if (!renta) return null;
    await this.rentaRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Renta | null> {
    const renta = await this.findOne(id);
    if (!renta) return null;
    await this.rentaRepository.delete(id);
    return renta;
  }
}