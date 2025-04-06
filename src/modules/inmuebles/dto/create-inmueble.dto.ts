import { IsString, IsNotEmpty, IsDecimal } from 'class-validator';

export class CreateInmuebleDto {
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  cod_postal: string;

  @IsString()
  @IsNotEmpty()
  municipio: string;

  @IsString()
  @IsNotEmpty()
  provincia: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsDecimal()
  @IsNotEmpty()
  metros_cuadrados: number;

  @IsString()
  @IsNotEmpty()
  ref_catastral: string;
}