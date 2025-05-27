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
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ProveedorService } from './proveedor.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { Proveedor } from './proveedor.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RequestUser } from 'src/common/decorators/current-user.decorator';

@ApiTags('Proveedores')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('user')
@Controller('proveedores')
export class ProveedorController {
  constructor(private readonly proveedorService: ProveedorService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo proveedor' })
  async create(
    @Body() dto: CreateProveedorDto,
    @RequestUser() user: { nombre: string },
  ): Promise<void> {
    await this.proveedorService.create(dto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los proveedores' })
  findAll(): Promise<Proveedor[]> {
    return this.proveedorService.findAll();
  }

  @Get('summary')
  @ApiOperation({ summary: 'Obtener todos los proveedores (id y codigo)' })
  findAllIdCodigo() {
    return this.proveedorService.findAllIdCodigo();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un proveedor por ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Proveedor> {
    return this.proveedorService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un proveedor por ID' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProveedorDto,
    @RequestUser() user: { nombre: string },
  ): Promise<void> {
    await this.proveedorService.update(id, dto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un proveedor por ID' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @RequestUser() user: { nombre: string },
  ): Promise<void> {
    await this.proveedorService.remove(id, user);
  }
}