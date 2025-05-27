import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { InmuebleService } from './inmueble.service';
import { CreateInmuebleDto } from './dto/create-inmueble.dto';
import { UpdateInmuebleDto } from './dto/update-inmueble.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RequestUser } from 'src/common/decorators/current-user.decorator';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('user')
@ApiTags('Inmuebles')
@Controller('inmuebles')
export class InmuebleController {
  constructor(private readonly inmueblesService: InmuebleService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo inmueble' })
  create(
    @Body() createInmuebleDto: CreateInmuebleDto,
    @RequestUser() user: { nombre: string },
  ): Promise<void> {
    return this.inmueblesService.create(createInmuebleDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los inmuebles' })
  findAll() {
    return this.inmueblesService.findAll();
  }

  @Get('summary')
  @ApiOperation({ summary: 'Obtener todos los inmuebles (id y codigo)' })
  findAllIdCodigo() {
    return this.inmueblesService.findAllIdCodigo();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un inmueble por ID' })
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.inmueblesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un inmueble por ID' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInmuebleDto: UpdateInmuebleDto,
    @RequestUser() user: { nombre: string },
  ): Promise<void> {
    return this.inmueblesService.update(id, updateInmuebleDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un inmueble por ID' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @RequestUser() user: { nombre: string },
  ): Promise<void> {
    return this.inmueblesService.remove(id, user);
  }
}