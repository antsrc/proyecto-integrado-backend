import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, Matches, MinLength } from 'class-validator';

export class CreateProveedorDto {
  @ApiProperty()
  @IsString({ message: 'El código debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El código es obligatorio' })
  @MaxLength(30, { message: 'El código no puede tener más de 30 caracteres' })
  codigo: string;

  @ApiProperty()
  @IsString({ message: 'El CIF debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El CIF es obligatorio' })
  @MinLength(9, { message: 'El CIF debe tener 9 caracteres' })
  @MaxLength(9, { message: 'El CIF debe tener 9 caracteres' })
  cif: string;

  @ApiProperty()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres' })
  @Matches(/^[A-Za-z0-9.,\- ]+$/, { message: 'El nombre contiene caracteres no válidos' })
  nombre: string;

  @ApiProperty()
  @IsString({ message: 'El tipo debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El tipo es obligatorio' })
  @MaxLength(30, { message: 'El tipo no puede tener más de 30 caracteres' })
  @Matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-_,\(\)\+]*$/, { message: 'El tipo contiene caracteres no válidos' })
  tipo: string;

  @ApiProperty()
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  @MaxLength(75, { message: 'La dirección no puede tener más de 75 caracteres' })
  @Matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,\-\/()#'+]*$/, { message: 'La dirección contiene caracteres no válidos' })
  direccion: string;

  @ApiProperty()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @MaxLength(30, { message: 'El teléfono no puede tener más de 30 caracteres' })
  @Matches(/^\+?[0-9 ]+$/, { message: 'El teléfono contiene caracteres no válidos' })
  telefono: string;

  @ApiProperty()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @MaxLength(100, { message: 'La descripción no puede tener más de 100 caracteres' })
  descripcion: string;
}
