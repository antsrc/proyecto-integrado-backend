import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, Matches, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'El nombre de usuario debe tener al menos 6 caracteres' })
  @MaxLength(30, { message: 'El nombre de usuario no puede tener más de 30 caracteres' })
  nombre: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(12, { message: 'La contraseña debe tener al menos 12 caracteres' })
  @MaxLength(64, { message: 'La contraseña no puede tener más de 64 caracteres' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_.!,?$*!@#&%:;+=-])[A-Za-z\d_.!,?$*!@#&%:;+=-]+$/,
    {
      message:
        'La contraseña debe contener una minúscula, una mayúscula, un número y un símbolo permitido',
    },
  )
  contrasena: string;
}
