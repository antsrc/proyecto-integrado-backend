import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class UpdateUsuarioDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria para actualizar' })
  @MinLength(12, { message: 'La contraseña debe tener al menos 12 caracteres' })
  @MaxLength(64, { message: 'La contraseña no puede tener más de 64 caracteres' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_.!,?$*!@#&%:;+=-])[A-Za-z\d_.!,?$*!@#&%:;+=-]{12,64}$/,
    {
      message:
        'La contraseña debe contener una minúscula, una mayúscula, un número y un símbolo permitido',
    },
  )
  contrasena: string;
}