import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsOptional,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateReformaDto {
  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'El código debe ser una cadena de texto' })
  @MaxLength(30, {
    message: 'El código no puede tener más de 30 caracteres',
  })
  codigo?: string;

  @ApiProperty()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsOptional()
  descripcion?: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'La observación debe ser una cadena de texto' })
  observacion?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString(
    {},
    {
      message:
        'La fecha de inicio debe tener formato de fecha válido (YYYY-MM-DD)',
    },
  )
  fechaInicio?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString(
    {},
    {
      message:
        'La fecha de fin debe tener formato de fecha válido (YYYY-MM-DD)',
    },
  )
  @Transform(({ value }) => (value === '' ? undefined : value))
  fechaFin?: Date;

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
