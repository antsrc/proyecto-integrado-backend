import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(dto: CreateUsuarioDto): Promise<Usuario | null> {
    const hashedPassword = await bcrypt.hash(dto.contrasena, 10);
    const usuario = this.usuarioRepository.create({
      nombre: dto.nombre,
      contrasena: hashedPassword,
    });
    const saved = await this.usuarioRepository.save(usuario);
    return this.findOne(saved.id);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      select: ['id', 'nombre', 'rol'],
    });
  }

  async findOne(id: number): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
      where: { id },
      select: ['id', 'nombre', 'rol']
    });
  }

  async findByNombre(nombre: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { nombre } });
  }

  async update(id: number, dto: UpdateUsuarioDto): Promise<Usuario | null> {
    const usuario = await this.findOne(id);
    if (!usuario) return null;
    const hashedPassword = await bcrypt.hash(dto.contrasena, 10);
    await this.usuarioRepository.update(id, {
      contrasena: hashedPassword,
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<Usuario | null> {
    const usuario = await this.findOne(id);
    if (!usuario) return null;
    await this.usuarioRepository.delete(id);
    return usuario;
  }
}
