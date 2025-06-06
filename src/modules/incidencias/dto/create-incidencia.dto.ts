import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateIncidenciaDto {
  @ApiProperty()
  @IsString({ message: 'El código debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El código es obligatorio' })
  @MaxLength(30, { message: 'El código no puede tener más de 30 caracteres' })
  @Matches(/^[A-Za-z0-9-]+$/, { message: 'El código solo puede contener letras, números y guiones' })
  codigo: string;

  @ApiProperty()
  @IsNumber({}, { message: 'El ID de alquiler debe ser un número' })
  @IsNotEmpty({ message: 'El ID de alquiler es obligatorio' })
  @Type(() => Number)
  alquilerId: number;

  @ApiProperty()
  @IsString({ message: 'El tipo de incidencia debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El tipo de incidencia es obligatorio' })
  @MaxLength(30, { message: 'El tipo no puede tener más de 30 caracteres' })
  @Matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-_,\(\)\+]*$/, { message: 'El tipo contiene caracteres no válidos' })
  tipo: string;

  @ApiProperty()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  descripcion: string;
}
