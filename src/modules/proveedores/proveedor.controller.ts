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
  import { ProveedorService } from './proveedor.service';
  import { CreateProveedorDto } from './dto/create-proveedor.dto';
  import { UpdateProveedorDto } from './dto/update-proveedor.dto';
  import { Proveedor } from './proveedor.entity';
  import { ApiTags, ApiOperation } from '@nestjs/swagger';
  
  @ApiTags('Proveedores')
  @Controller('proveedores')
  export class ProveedorController {
    constructor(private readonly proveedorService: ProveedorService) {}
  
    @Post()
    @ApiOperation({ summary: 'Crear un nuevo proveedor' })
    create(@Body() dto: CreateProveedorDto): Promise<Proveedor> {
      return this.proveedorService.create(dto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Listar todos los proveedores' })
    findAll(): Promise<Proveedor[]> {
      return this.proveedorService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Obtener un proveedor por ID' })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Proveedor> {
      const proveedor = await this.proveedorService.findOne(id);
      if (!proveedor) throw new NotFoundException();
      return proveedor;
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un proveedor por ID' })
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: UpdateProveedorDto,
    ): Promise<Proveedor> {
      const updated = await this.proveedorService.update(id, dto);
      if (!updated) throw new NotFoundException();
      return updated;
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un proveedor por ID' })
    async remove(@Param('id', ParseIntPipe) id: number): Promise<Proveedor> {
      const removed = await this.proveedorService.remove(id);
      if (!removed) throw new NotFoundException();
      return removed;
    }
  }  