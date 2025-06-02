import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  Max,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateAlquilerDto {
  @ApiProperty()
  @IsString({ message: 'El código debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El código es obligatorio' })
  @MaxLength(30, { message: 'El código no puede tener más de 30 caracteres' })
  codigo: string;

  @ApiProperty()
  @IsNumber({}, { message: 'El cliente no es válido' })
  @IsNotEmpty({ message: 'El cliente es obligatorio' })
  @Type(() => Number)
  clienteId: number;

  @ApiProperty()
  @IsNumber({}, { message: 'El inmueble no es válido' })
  @IsNotEmpty({ message: 'El inmueble es obligatorio' })
  @Type(() => Number)
  inmuebleId: number;

  @ApiProperty()
  @IsDateString({}, { message: 'La fecha de alta debe tener formato de fecha válido (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'La fecha de alta es obligatoria' })
  @Transform(({ value }) => (typeof value === 'string' && value.length > 10 ? value.slice(0, 10) : value))
  fechaAlta: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de baja debe tener formato de fecha válido (YYYY-MM-DD)' })
  @Transform(({ value }) => {
    if (value === '' || value === undefined || value === null) return null;
    if (typeof value === 'string' && value.length > 10) return value.slice(0, 10);
    return value;
  })
  fechaBaja?: Date;

  @ApiProperty()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'La fianza no puede tener más de 2 decimales' })
  @Min(1, { message: 'La fianza no puede ser menor de 1' })
  @IsNotEmpty({ message: 'La fianza es obligatoria' })
  @Transform(({ value }) => {
    const n = Number(value);
    return value === '' || value === undefined || value === null || isNaN(n)
      ? null
      : n;
  })
  @Type(() => Number)
  @Max(9999.99, { message: 'La fianza no puede tener más de 4 dígitos enteros' })
  fianza: number;
}