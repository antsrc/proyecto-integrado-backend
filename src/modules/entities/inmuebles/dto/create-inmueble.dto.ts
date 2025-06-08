import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  Length,
  MaxLength,
  Min,
  Max,
  Matches,
} from 'class-validator';

export class CreateInmuebleDto {
  @ApiProperty()
  @IsString({ message: 'El código debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El código es obligatorio' })
  @MaxLength(30, { message: 'El código no puede tener más de 30 caracteres' })
  @Matches(/^[A-Za-z0-9-]+$/, { message: 'El código solo puede contener letras, números y guiones' })
  codigo: string;

  @ApiProperty()
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  @MaxLength(75, { message: 'La dirección no puede tener más de 75 caracteres' })
  @Matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,\-\/()#'+º]*$/, { message: 'La dirección contiene caracteres no válidos' })
  direccion: string;

  @ApiProperty()
  @IsString({ message: 'El código postal debe ser una cadena de texto' })
  @Length(5, 5, { message: 'El código postal debe tener exactamente 5 caracteres' })
  @Matches(/^\d{5}$/, { message: 'El código postal solo puede contener números' })
  codPostal: string;

  @ApiProperty()
  @IsString({ message: 'El municipio debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El municipio es obligatorio' })
  @MaxLength(30, { message: 'El municipio no puede tener más de 30 caracteres' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ ]+$/, { message: 'El municipio contiene caracteres no válidos' })
  municipio: string;

  @ApiProperty()
  @IsString({ message: 'La provincia debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La provincia es obligatoria' })
  @MaxLength(30, { message: 'La provincia no puede tener más de 30 caracteres' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ ]+$/, { message: 'La provincia contiene caracteres no válidos' })
  provincia: string;

  @ApiProperty()
  @IsString({ message: 'El tipo debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El tipo de inmueble es obligatorio' })
  @MaxLength(30, { message: 'El tipo no puede tener más de 30 caracteres' })
  @Matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-_,\(\)\+]*$/, { message: 'El tipo contiene caracteres no válidos' })
  tipo: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Los metros cuadrados no pueden tener más de 2 decimales' },
  )
  @Min(1, { message: 'Los metros cuadrados no pueden ser menores de 1' })
  @Max(9999.99, { message: 'Los metros cuadrados no pueden tener más de 4 dígitos enteros' })
  metrosCuadrados: number;

  @ApiProperty()
  @IsString({ message: 'La referencia catastral debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La referencia catastral es obligatoria' })
  @Length(20, 20, { message: 'La referencia catastral debe tener exactamente 20 caracteres' })
  @Matches(/^[A-Za-z0-9]+$/, { message: 'La referencia catastral no puede contener espacios ni caracteres especiales' })
  refCatastral: string;
}
