import { PartialType } from '@nestjs/mapped-types';
import { CreateRentaDto } from './create-renta.dto';
import { IsDecimal, IsOptional, IsInt } from 'class-validator';

export class UpdateRentaDto extends PartialType(CreateRentaDto) {
  @IsInt()
  @IsOptional()
  ano?: number;

  @IsDecimal()
  @IsOptional()
  base?: number;

  @IsDecimal()
  @IsOptional()
  comunidad?: number;

  @IsDecimal()
  @IsOptional()
  iva?: number;

  @IsDecimal()
  @IsOptional()
  total?: number;
}
