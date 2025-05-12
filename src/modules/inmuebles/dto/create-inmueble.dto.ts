import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  Length,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateInmuebleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  codigo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  direccion: string;

  @ApiProperty()
  @IsString()
  @Length(5, 5)
  cod_postal: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  municipio: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  provincia: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  tipo: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  metros_cuadrados: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  ref_catastral: string;
}