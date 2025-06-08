import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './usuario.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RequestUser } from 'src/common/decorators/current-user.decorator';

@UseGuards(RolesGuard)
@Roles('admin')
@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @ApiOperation({ summary: 'Crear usuario (administrativo)' })
  async create(
    @Body() dto: CreateUsuarioDto,
    @RequestUser() currentUser: any,
  ): Promise<void> {
    await this.usuarioService.create(dto, currentUser);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los usuarios' })
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar contraseña del usuario' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUsuarioDto,
  ): Promise<void> {
    await this.usuarioService.updatePassword(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar usuario por ID' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.usuarioService.remove(id);
  }
}
