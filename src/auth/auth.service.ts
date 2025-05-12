import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../modules/usuarios/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(nombre: string, contrasena: string) {
    const usuario = await this.usuarioService.findByNombre(nombre);
    if (!usuario) throw new UnauthorizedException();
    const passwordValid = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!passwordValid)
      throw new UnauthorizedException();
    return usuario;
  }

  async login(nombre: string, contrasena: string) {
    const usuario = await this.validateUser(nombre, contrasena);
    const payload = { nombre: usuario.nombre, rol: usuario.rol };
    const token = this.jwtService.sign(payload);
    return token;
  }

  getUser(token?: string) {
    if (!token) throw new UnauthorizedException();
  
    try {
      const payload = this.jwtService.verify(token);
      const { nombre, rol } = payload;
      return { nombre, rol };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
