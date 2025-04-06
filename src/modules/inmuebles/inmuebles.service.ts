import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInmuebleDto } from './dto/create-inmueble.dto';
import { UpdateInmuebleDto } from './dto/update-inmueble.dto';
import { Inmueble } from './entities/inmueble.entity';

@Injectable()
export class InmueblesService {
  
  constructor(
    @InjectRepository(Inmueble)
    private readonly inmuebleRepository: Repository<Inmueble>,
  ) {}

  async create(createInmuebleDto: CreateInmuebleDto): Promise<Inmueble> {
    const inmueble = this.inmuebleRepository.create(createInmuebleDto);
    return this.inmuebleRepository.save(inmueble);
  }

  async findAll(): Promise<Inmueble[]> {
    return this.inmuebleRepository.find(); 
  }

  async findOne(id: number): Promise<Inmueble | null> {
    return this.inmuebleRepository.findOne({ where: { id } });
  }

  async update(id: number, updateInmuebleDto: UpdateInmuebleDto): Promise<Inmueble | null> {
    await this.inmuebleRepository.update(id, updateInmuebleDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.inmuebleRepository.delete(id);
    return result.affected === 1;
  }
}