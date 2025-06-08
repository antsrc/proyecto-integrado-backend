import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
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

  async create(dto: CreateUsuarioDto, currentUser: any): Promise<void> {
    const usuarioCreacion = currentUser?.nombre ?? 'sistema';
    const hashedPassword = await bcrypt.hash(dto.contrasena, 12);
    const usuario = this.usuarioRepository.create({
      nombre: dto.nombre,
      contrasena: hashedPassword,
      fechaCreacion: new Date(),
      usuarioCreacion,
    });
    await this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      select: ['id', 'nombre', 'rol', 'usuarioCreacion', 'fechaCreacion', 'ultimoInicio'],
    });
  }

  private async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      select: ['id', 'nombre', 'rol']
    });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  async findByNombre(nombre: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { nombre }, select: ['id', 'nombre', 'rol', 'contrasena'] });
  }

  async updatePassword(id: number, dto: UpdateUsuarioDto): Promise<void> {
    const usuario = await this.findOne(id);
    if (usuario.rol === 'admin') {
      throw new ForbiddenException('Operación no permitida');
    }
    const hashedPassword = await bcrypt.hash(dto.contrasena, 10);
    await this.usuarioRepository.update(id, { contrasena: hashedPassword });
  }

  async registrarInicio(id: number, fecha: Date): Promise<void> {
    await this.findOne(id);
    await this.usuarioRepository.update(id, { ultimoInicio: fecha });
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.usuarioRepository.delete(id);
  }
}
