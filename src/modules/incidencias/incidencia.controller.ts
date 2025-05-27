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
import { IncidenciaService } from './incidencia.service';
import { CreateIncidenciaDto } from './dto/create-incidencia.dto';
import { UpdateIncidenciaDto } from './dto/update-incidencia.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { RequestUser } from 'src/common/decorators/current-user.decorator';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('user')
@ApiTags('Incidencias')
@Controller('incidencias')
export class IncidenciaController {
  constructor(private readonly incidenciaService: IncidenciaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva incidencia' })
  create(
    @Body() dto: CreateIncidenciaDto,
    @RequestUser() user: { nombre: string },
  ): Promise<void> {
    return this.incidenciaService.create(dto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las incidencias' })
  findAll(): Promise<any[]> {
    return this.incidenciaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una incidencia por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.incidenciaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar proveedor avisado en una incidencia' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateIncidenciaDto,
    @RequestUser() user: { nombre: string },
  ): Promise<void> {
    return this.incidenciaService.update(id, dto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una incidencia' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @RequestUser() user: { nombre: string },
  ): Promise<void> {
    return this.incidenciaService.remove(id, user);
  }
}
