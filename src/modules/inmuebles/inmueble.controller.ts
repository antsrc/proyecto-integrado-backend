import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { InmuebleService } from './inmueble.service';
import { CreateInmuebleDto } from './dto/create-inmueble.dto';
import { UpdateInmuebleDto } from './dto/update-inmueble.dto';
import { Inmueble } from './inmueble.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Inmuebles')
@Controller('inmuebles')
export class InmuebleController {
  constructor(private readonly inmueblesService: InmuebleService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo inmueble' })
  create(@Body() createInmuebleDto: CreateInmuebleDto): Promise<Inmueble> {
    return this.inmueblesService.create(createInmuebleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los inmuebles' })
  findAll(): Promise<Inmueble[]> {
    return this.inmueblesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un inmueble por ID' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Inmueble> {
    const inmueble = await this.inmueblesService.findOne(id);
    if (!inmueble)
      throw new NotFoundException();
    return inmueble;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un inmueble por ID' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInmuebleDto: UpdateInmuebleDto,
  ): Promise<Inmueble> {
    const inmueble = await this.inmueblesService.update(id, updateInmuebleDto);
    if (!inmueble)
      throw new NotFoundException();
    return inmueble;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un inmueble por ID' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Inmueble> {
    const inmueble = await this.inmueblesService.remove(id);
    if (!inmueble)
      throw new NotFoundException();
    return inmueble;
  }
}
