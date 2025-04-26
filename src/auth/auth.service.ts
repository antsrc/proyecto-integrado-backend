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
    if (!usuario) throw new UnauthorizedException('Credenciales inválidas');
    const passwordValid = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!passwordValid)
      throw new UnauthorizedException('Credenciales inválidas');
    return usuario;
  }

  async login(nombre: string, contrasena: string) {
    const usuario = await this.validateUser(nombre, contrasena);
    const payload = {
      sub: usuario.id,
      rol: usuario.rol,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
