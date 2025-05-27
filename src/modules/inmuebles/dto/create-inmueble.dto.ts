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
} from 'class-validator';

export class CreateInmuebleDto {
  @ApiProperty()
  @IsString({ message: 'El código debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El código es obligatorio' })
  @MaxLength(30, { message: 'El código no puede tener más de 30 caracteres' })
  codigo: string;

  @ApiProperty()
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  @MaxLength(100, { message: 'La dirección no puede tener más de 100 caracteres' })
  direccion: string;

  @ApiProperty()
  @IsString({ message: 'El código postal debe ser una cadena de texto' })
  @Length(5, 5, { message: 'El código postal debe tener exactamente 5 caracteres' })
  codPostal: string;

  @ApiProperty()
  @IsString({ message: 'El municipio debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El municipio es obligatorio' })
  @MaxLength(30, { message: 'El municipio no puede tener más de 30 caracteres' })
  municipio: string;

  @ApiProperty()
  @IsString({ message: 'La provincia debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La provincia es obligatoria' })
  @MaxLength(30, { message: 'La provincia no puede tener más de 30 caracteres' })
  provincia: string;

  @ApiProperty()
  @IsString({ message: 'El tipo debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El tipo de inmueble es obligatorio' })
  @MaxLength(30, { message: 'El tipo no puede tener más de 30 caracteres' })
  tipo: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Los metros cuadrados deben ser un número con máximo 2 decimales' },
  )
  @Min(1, { message: 'Los metros cuadrados deben ser al menos 1' })
  @Max(999999.99, { message: 'Los metros cuadrados no pueden tener más de 6 dígitos enteros y 2 decimales' })
  metrosCuadrados: number;

  @ApiProperty()
  @IsString({ message: 'La referencia catastral debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La referencia catastral es obligatoria' })
  @MaxLength(30, { message: 'La referencia catastral no puede tener más de 30 caracteres' })
  refCatastral: string;
}
