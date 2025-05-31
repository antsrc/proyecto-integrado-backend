import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateMensualidadDto {
  @ApiProperty()
  @IsNumber({}, { message: 'El alquiler no es válido' })
  @IsNotEmpty({ message: 'El alquiler es obligatorio' })
  @Type(() => Number)
  alquilerId: number;

  @ApiProperty({ description: 'Fecha de inicio del periodo de la mensualidad', example: '2025-01-01' })
  @IsDateString({}, { message: 'La fecha de inicio debe tener formato de fecha válido (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'La fecha de inicio es obligatoria' })
  fechaInicio: Date;

  @ApiProperty({ description: 'Fecha de fin del periodo de la mensualidad', example: '2025-01-31' })
  @IsDateString({}, { message: 'La fecha de fin debe tener formato de fecha válido (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'La fecha de fin es obligatoria' })
  fechaFin: Date;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El importe debe ser un número con hasta 2 decimales' })
  @Min(1, { message: 'El importe no puede ser negativo' })
  @IsNotEmpty({ message: 'El importe es obligatorio' })
  @Type(() => Number)
  importe: number;

  @ApiProperty()
  @IsDateString({}, { message: 'La fecha de emisión debe tener formato de fecha válido (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'La fecha de emisión es obligatoria' })
  fechaEmision: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de pago debe tener formato de fecha válido (YYYY-MM-DD)' })
  fechaPago?: Date;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'La forma de pago debe ser una cadena de texto' })
  @MaxLength(30, { message: 'La forma de pago no puede tener más de 30 caracteres' })
  formaPago?: string;
}
