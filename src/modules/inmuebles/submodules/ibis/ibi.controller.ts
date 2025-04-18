import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { IbisService } from './ibi.service';
import { CreateIbiDto } from './dto/create-ibi.dto';
import { UpdateIbiDto } from './dto/update-ibi.dto';
import { Ibi } from './ibi.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Ibis')
@Controller('inmuebles/:inmuebleId/ibis')
export class IbisController {
  constructor(private readonly ibisService: IbisService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un recibo IBI para un inmueble' })
  create(
    @Param('inmuebleId', ParseIntPipe) inmuebleId: number,
    @Body() createIbiDto: CreateIbiDto,
  ): Promise<Ibi | null> {
    return this.ibisService.create(inmuebleId, createIbiDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar recibos IBI de un inmueble' })
  findAll(
    @Param('inmuebleId', ParseIntPipe) inmuebleId: number,
  ): Promise<Ibi[]> {
    return this.ibisService.findAll(inmuebleId);
  }

  @Patch(':ibiId')
  @ApiOperation({ summary: 'Actualizar un recibo IBI de un inmueble' })
  async update(
    @Param('ibiId', ParseIntPipe) ibiId: number,
    @Body() updateIbiDto: UpdateIbiDto,
  ): Promise<Ibi> {
    const ibi = await this.ibisService.update(ibiId, updateIbiDto);
    if (!ibi) throw new NotFoundException();
    return ibi;
  }

  @Delete(':ibiId')
  @ApiOperation({ summary: 'Eliminar un recibo IBI de un inmueble' })
  async remove(
    @Param('ibiId', ParseIntPipe) ibiId: number,
  ): Promise<Ibi> {
    const ibi = await this.ibisService.remove(ibiId);
    if (!ibi) throw new NotFoundException();
    return ibi;
  }
}
