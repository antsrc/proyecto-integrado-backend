import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  IsDateString,
} from 'class-validator';

export class CreateIncidenciaDto {
  @ApiProperty()
  @IsNumber()
  alquilerId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  proveedorAvisadoId?: number;

  @ApiProperty()
  @IsNumber()
  tipoId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  descripcion: string;

  @ApiProperty()
  @IsDateString()
  fechaRegistro: Date;
}
