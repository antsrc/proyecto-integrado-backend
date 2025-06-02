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
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RequestUser } from 'src/common/decorators/current-user.decorator';

@UseGuards(RolesGuard)
@Roles('user')
@ApiTags('Clientes')
@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  create(
    @Body() createClienteDto: CreateClienteDto,
    @RequestUser() user: { nombre: string },
  ): Promise<void> {
    return this.clienteService.create(createClienteDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los clientes' })
  findAll() {
    return this.clienteService.findAll();
  }

  @Get('summary')
  @ApiOperation({ summary: 'Obtener todos los clientes (id y codigo)' })
  findAllIdCodigo() {
    return this.clienteService.findAllIdCodigo();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente por ID' })
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.clienteService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un cliente por ID' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClienteDto: UpdateClienteDto,
    @RequestUser() user: { nombre: string },
  ): Promise<void> {
    return this.clienteService.update(id, updateClienteDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un cliente por ID' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @RequestUser() user: { nombre: string },
  ): Promise<void> {
    return this.clienteService.remove(id, user);
  }
}