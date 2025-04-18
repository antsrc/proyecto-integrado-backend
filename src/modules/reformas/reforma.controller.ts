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
import { ReformaService } from './reforma.service';
import { CreateReformaDto } from './dto/create-reforma.dto';
import { UpdateReformaDto } from './dto/update-reforma.dto';
import { Reforma } from './reforma.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Reformas')
@Controller('reformas')
export class ReformaController {
  constructor(private readonly reformaService: ReformaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva reforma' })
  create(@Body() dto: CreateReformaDto): Promise<Reforma> {
    return this.reformaService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las reformas' })
  findAll(): Promise<Reforma[]> {
    return this.reformaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una reforma por ID' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Reforma> {
    const reforma = await this.reformaService.findOne(id);
    if (!reforma) throw new NotFoundException();
    return reforma;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una reforma por ID' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReformaDto,
  ): Promise<Reforma> {
    const updated = await this.reformaService.update(id, dto);
    if (!updated) throw new NotFoundException();
    return updated;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una reforma por ID' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Reforma> {
    const removed = await this.reformaService.remove(id);
    if (!removed) throw new NotFoundException();
    return removed;
  }
}