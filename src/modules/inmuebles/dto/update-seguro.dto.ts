import { PartialType } from '@nestjs/mapped-types';
import { CreateSeguroDto } from './create-seguro.dto';
import { IsString, IsOptional, IsDate } from 'class-validator';

export class UpdateSeguroDto extends PartialType(CreateSeguroDto) {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsDate()
  @IsOptional()
  fecha_alta?: Date;

  @IsDate()
  @IsOptional()
  fecha_vencimiento?: Date;

  @IsString()
  @IsOptional()
  tfno_asistencia?: string;

  @IsString()
  @IsOptional()
  num_poliza?: string;
}