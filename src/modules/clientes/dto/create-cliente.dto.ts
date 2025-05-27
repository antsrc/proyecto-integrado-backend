import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class CreateClienteDto {
  @ApiProperty()
  @IsString({ message: 'El código debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El código es obligatorio' })
  @MaxLength(30, { message: 'El código no puede tener más de 30 caracteres' })
  codigo: string;

  @ApiProperty()
  @IsString({ message: 'El DNI debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El DNI es obligatorio' })
  @MaxLength(9, { message: 'El DNI no puede tener más de 9 caracteres' })
  dni: string;

  @ApiProperty()
  @IsString({ message: 'El nombre completo debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre completo es obligatorio' })
  @MaxLength(100, { message: 'El nombre completo no puede superar los 100 caracteres' })
  nombreCompleto: string;

  @ApiProperty()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @MaxLength(30, { message: 'El teléfono no puede tener más de 30 caracteres' })
  telefono: string;

  @ApiProperty()
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @MaxLength(100, { message: 'El correo electrónico no puede tener más de 100 caracteres' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'El número de cuenta debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El número de cuenta es obligatorio' })
  @MaxLength(30, { message: 'El número de cuenta no puede tener más de 30 caracteres' })
  numCuenta: string;

  @ApiProperty()
  @IsString({ message: 'El campo "referido por" debe ser una cadena de texto' })
  @IsOptional()
  @MaxLength(100, { message: 'Este campo "referido por" no puede superar los 100 caracteres' })
  referidoPor?: string;
}
