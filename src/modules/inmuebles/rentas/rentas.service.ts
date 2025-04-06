import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRentaDto } from '../dto/create-renta.dto';
import { UpdateRentaDto } from '../dto/update-renta.dto';
import { Renta } from '../entities/renta.entity';

@Injectable()
export class RentasService {
  constructor(
    @InjectRepository(Renta)
    private readonly rentasRepository: Repository<Renta>,
  ) {}

  async create(inmuebleId: number, createRentaDto: CreateRentaDto): Promise<Renta> {
    const renta = this.rentasRepository.create({ ...createRentaDto, inmuebleId });
    return this.rentasRepository.save(renta);
  }

  async findAll(inmuebleId: number): Promise<Renta[]> {
    return this.rentasRepository.find({ where: { inmuebleId } });
  }

  async findOne(inmuebleId: number, id: number): Promise<Renta | null> {
    return this.rentasRepository.findOne({ where: { id, inmuebleId } });
  }

  async update(inmuebleId: number, id: number, updateRentaDto: UpdateRentaDto): Promise<Renta | null> {
    const renta = await this.findOne(inmuebleId, id);
    if (!renta) return null;
    await this.rentasRepository.update(id, { ...updateRentaDto, inmuebleId });
    return this.findOne(inmuebleId, id);
  }

  async remove(inmuebleId: number, id: number): Promise<boolean> {
    const renta = await this.findOne(inmuebleId, id);
    if (!renta) return false;
    const result = await this.rentasRepository.delete(id);
    return result.affected === 1;
  }
}
