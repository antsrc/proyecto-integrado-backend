import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IbisService } from './ibis.service';
import { CreateIbiDto } from '../dto/create-ibi.dto';
import { UpdateIbiDto } from '../dto/update-ibi.dto';
import { Ibi } from '../entities/ibi.entity';

@Controller('inmuebles/:inmuebleId/ibis')
export class IbisController {
  constructor(private readonly ibiService: IbisService) {}

  @Post()
  async create(
    @Param('inmuebleId') inmuebleId: number,
    @Body() createIbiDto: CreateIbiDto,
  ): Promise<Ibi> {
    return this.ibiService.create(inmuebleId, createIbiDto);
  }

  @Get()
  async findAll(@Param('inmuebleId') inmuebleId: number): Promise<Ibi[]> {
    return this.ibiService.findAll(inmuebleId);
  }

  @Get(':ibiId')
  async findOne(
    @Param('inmuebleId') inmuebleId: number,
    @Param('ibiId') ibiId: number,
  ): Promise<Ibi | null> {
    return this.ibiService.findOne(inmuebleId, ibiId);
  }

  @Patch(':ibiId')
  async update(
    @Param('inmuebleId') inmuebleId: number,
    @Param('ibiId') ibiId: number,
    @Body() updateIbiDto: UpdateIbiDto,
  ): Promise<Ibi | null> {
    return this.ibiService.update(inmuebleId, ibiId, updateIbiDto);
  }

  @Delete(':ibiId')
  async remove(
    @Param('inmuebleId') inmuebleId: number,
    @Param('ibiId') ibiId: number,
  ): Promise<boolean> {
    return this.ibiService.remove(inmuebleId, ibiId);
  }
}