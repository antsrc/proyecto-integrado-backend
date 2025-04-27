import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './usuario.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @ApiOperation({ summary: 'Crear usuario (administrativo)' })
  create(@Body() dto: CreateUsuarioDto): Promise<Usuario | null> {
    return this.usuarioService.create(dto);
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
  ): Promise<Usuario> {
    const updated = await this.usuarioService.update(id, dto);
    if (!updated) throw new NotFoundException();
    return updated;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar usuario por ID' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    const deleted = await this.usuarioService.remove(id);
    if (!deleted) throw new NotFoundException();
    return deleted;
  }
}
