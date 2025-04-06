import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateObservacionDto {
  @IsString()
  @IsNotEmpty()
  comentario: string;

  @IsDateString()
  @IsNotEmpty()
  fecha: string;
}