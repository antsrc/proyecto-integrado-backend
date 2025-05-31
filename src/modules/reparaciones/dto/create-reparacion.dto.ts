import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateReparacionDto {
  @ApiProperty({ description: 'ID de la incidencia asociada' })
  @IsNumber({}, { message: 'El id de incidencia debe ser un número' })
  @IsNotEmpty({ message: 'La incidencia es obligatoria' })
  incidenciaId: number;

  @ApiProperty({ description: 'ID del proveedor asociado' })
  @IsNumber({}, { message: 'El id de proveedor debe ser un número' })
  @IsNotEmpty({ message: 'El proveedor es obligatorio' })
  proveedorId: number;

  @ApiProperty({ description: 'Fecha de finalización de la reparación', example: '2025-05-28' })
  @IsDateString({}, { message: 'La fecha de fin debe tener formato de fecha válido (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'La fecha de fin es obligatoria' })
  fechaFin: Date;

  @ApiProperty({ description: 'Importe de la reparación'})
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El importe debe ser un número con hasta 2 decimales' })
  @Min(0, { message: 'El importe no puede ser negativo' })
  @IsNotEmpty({ message: 'El importe es obligatorio' })
  @Type(() => Number)
  importe: number;

  @ApiProperty({ description: 'Descripción de la reparación' })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  descripcion: string;
}
