import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { InmueblesService } from './inmuebles.service';
import { CreateInmuebleDto } from './dto/create-inmueble.dto';
import { UpdateInmuebleDto } from './dto/update-inmueble.dto';
import { Inmueble } from './entities/inmueble.entity';

@Controller('inmuebles')
export class InmueblesController {
  constructor(private readonly inmueblesService: InmueblesService) {}

  @Post()
  async create(@Body() createInmuebleDto: CreateInmuebleDto): Promise<Inmueble> {
    return this.inmueblesService.create(createInmuebleDto);
  }

  @Get()
  async findAll(): Promise<Inmueble[]> {
    return this.inmueblesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Inmueble | null> {
    return this.inmueblesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateInmuebleDto: UpdateInmuebleDto,
  ): Promise<Inmueble | null> {
    return this.inmueblesService.update(id, updateInmuebleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return this.inmueblesService.remove(id);
  }
}