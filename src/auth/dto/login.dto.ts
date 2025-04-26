import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  nombre: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  contrasena: string;
}
