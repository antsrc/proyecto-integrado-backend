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
  import { ClienteService } from './cliente.service';
  import { CreateClienteDto } from './dto/create-cliente.dto';
  import { UpdateClienteDto } from './dto/update-cliente.dto';
  import { Cliente } from './cliente.entity';
  import { ApiTags, ApiOperation } from '@nestjs/swagger';
  
  @ApiTags('Clientes')
  @Controller('clientes')
  export class ClienteController {
    constructor(private readonly clienteService: ClienteService) {}
  
    @Post()
    @ApiOperation({ summary: 'Crear un nuevo cliente' })
    create(@Body() dto: CreateClienteDto): Promise<Cliente> {
      return this.clienteService.create(dto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Listar todos los clientes' })
    findAll(): Promise<Cliente[]> {
      return this.clienteService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Obtener un cliente por ID' })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Cliente> {
      const cliente = await this.clienteService.findOne(id);
      if (!cliente) throw new NotFoundException();
      return cliente;
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un cliente por ID' })
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: UpdateClienteDto,
    ): Promise<Cliente> {
      const updated = await this.clienteService.update(id, dto);
      if (!updated) throw new NotFoundException();
      return updated;
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un cliente por ID' })
    async remove(@Param('id', ParseIntPipe) id: number): Promise<Cliente> {
      const removed = await this.clienteService.remove(id);
      if (!removed) throw new NotFoundException();
      return removed;
    }
  }  