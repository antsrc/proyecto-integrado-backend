import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateProveedorDto {
  @ApiProperty()
  @IsString({ message: 'El código debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El código es obligatorio' })
  @MaxLength(30, { message: 'El código no puede tener más de 30 caracteres' })
  codigo: string;

  @ApiProperty()
  @IsString({ message: 'El CIF debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El CIF es obligatorio' })
  @MaxLength(30, { message: 'El CIF no puede tener más de 30 caracteres' })
  cif: string;

  @ApiProperty()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres' })
  nombre: string;

  @ApiProperty()
  @IsString({ message: 'El tipo debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El tipo es obligatorio' })
  @MaxLength(30, { message: 'El tipo no puede tener más de 30 caracteres' })
  tipo: string;

  @ApiProperty()
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  @MaxLength(100, { message: 'La dirección no puede tener más de 100 caracteres' })
  direccion: string;

  @ApiProperty()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @MaxLength(30, { message: 'El teléfono no puede tener más de 30 caracteres' })
  telefono: string;

  @ApiProperty()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @MaxLength(100, { message: 'La descripción no puede tener más de 100 caracteres' })
  descripcion: string;
}
