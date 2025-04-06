import { IsString, IsOptional, IsDecimal } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateInmuebleDto } from './create-inmueble.dto';

export class UpdateInmuebleDto extends PartialType(CreateInmuebleDto) {
  @IsString()
  @IsOptional()
  codigo?: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  @IsOptional()
  cod_postal?: string;

  @IsString()
  @IsOptional()
  municipio?: string;

  @IsString()
  @IsOptional()
  provincia?: string;

  @IsString()
  @IsOptional()
  tipo?: string;

  @IsDecimal()
  @IsOptional()
  metros_cuadrados?: number;

  @IsString()
  @IsOptional()
  ref_catastral?: string;
}