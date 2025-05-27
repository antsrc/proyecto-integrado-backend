import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateReformaDto {
  @ApiProperty()
  @IsString({ message: 'El código debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El código es obligatorio' })
  @MaxLength(30, {
    message: 'El código no puede tener más de 30 caracteres',
  })
  codigo: string;

  @ApiProperty()
  @IsNumber({}, { message: 'El inmueble no es válido' })
  @IsNotEmpty({ message: 'El inmueble es obligatorio' })
  @Type(() => Number)
  inmuebleId: number;

  @ApiProperty()
  @IsNumber({}, { message: 'El proveedor no es válido' })
  @IsNotEmpty({ message: 'El proveedor es obligatorio' })
  @Type(() => Number)
  proveedorId: number;

  @ApiProperty()
  @IsString({ message: 'El tipo debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El tipo es obligatorio' })
  @MaxLength(30, {
    message: 'El tipo no puede tener más de 30 caracteres',
  })
  tipo: string;

  @ApiProperty()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsOptional()
  descripcion?: string;

  @ApiProperty()
  @IsDateString(
    {},
    {
      message:
        'La fecha de inicio debe tener formato de fecha válido (YYYY-MM-DD)',
    },
  )
  @IsNotEmpty({ message: 'La fecha de inicio es obligatoria' })
  @Transform(({ value }) => (typeof value === 'string' && value.length > 10 ? value.slice(0, 10) : value))
  fechaInicio: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString(
    {},
    {
      message:
        'La fecha de fin debe tener formato de fecha válido (YYYY-MM-DD)',
    },
  )
  @Transform(({ value }) => {
    if (value === '' || value === undefined || value === null) return null;
    if (typeof value === 'string' && value.length > 10) return value.slice(0, 10);
    return value;
  })  fechaFin?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => {
    const n = Number(value);
    return value === '' || value === undefined || value === null || isNaN(n)
      ? null
      : n;
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El importe debe ser un número con hasta 2 decimales' },
  )
  @Min(0, { message: 'El importe no puede ser negativo' })
  importe?: number;
}
