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
import { TipoService } from './tipo.service';
import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';
import { Tipo } from './tipo.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Tipos de incidencia')
@Controller('tipos-incidencia')
export class TipoController {
  constructor(private readonly tipoService: TipoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo tipo de incidencia' })
  create(@Body() dto: CreateTipoDto): Promise<Tipo> {
    return this.tipoService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los tipos de incidencia' })
  findAll(): Promise<Tipo[]> {
    return this.tipoService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un tipo de incidencia' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTipoDto,
  ): Promise<Tipo> {
    const updated = await this.tipoService.update(id, dto);
    if (!updated) throw new NotFoundException();
    return updated;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un tipo de incidencia' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Tipo> {
    const removed = await this.tipoService.remove(id);
    if (!removed) throw new NotFoundException();
    return removed;
  }
}
