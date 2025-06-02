import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsEmail,
  IsOptional,
  Matches,
} from 'class-validator';

export class CreateClienteDto {
  @ApiProperty()
  @IsString({ message: 'El código debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El código es obligatorio' })
  @MaxLength(30, { message: 'El código no puede tener más de 30 caracteres' })
  @Matches(/^[A-Za-z0-9-]+$/, { message: 'El código solo puede contener letras, números y guiones' })
  codigo: string;

  @ApiProperty()
  @IsString({ message: 'El DNI debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El DNI es obligatorio' })
  @MaxLength(9, { message: 'El DNI no puede tener más de 9 caracteres' })
  @Matches(/^[A-Za-z0-9]+$/, { message: 'El DNI solo puede contener letras y números' })
  dni: string;

  @ApiProperty()
  @IsString({ message: 'El nombre completo debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre completo es obligatorio' })
  @MaxLength(50, { message: 'El nombre completo no puede superar los 50 caracteres' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ'\-. ]+$/, { message: 'El nombre completo contiene caracteres no válidos' })
  nombreCompleto: string;

  @ApiProperty()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @MaxLength(15, { message: 'El teléfono no puede tener más de 15 caracteres' })
  @Matches(/^\+?[0-9 ()-]+$/, { message: 'El teléfono contiene caracteres no válidos' })
  telefono: string;

  @ApiProperty()
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @MaxLength(50, { message: 'El correo electrónico no puede tener más de 50 caracteres' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'El número de cuenta debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El número de cuenta es obligatorio' })
  @MaxLength(30, { message: 'El número de cuenta no puede tener más de 30 caracteres' })
  @Matches(/^[A-Za-z0-9 ]+$/, { message: 'El número de cuenta no puede contener caracteres especiales' })
  numCuenta: string;

  @ApiProperty()
  @IsString({ message: 'El campo "referido por" debe ser una cadena de texto' })
  @IsOptional()
  @MaxLength(50, { message: 'Este campo "referido por" no puede superar los 50 caracteres' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ'\-. ]+$/, { message: 'El campo "referido por" contiene caracteres no válidos' })
  referidoPor?: string;
}
