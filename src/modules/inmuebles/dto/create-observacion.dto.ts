import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateObservacionDto {
  @IsString()
  @IsNotEmpty()
  comentario: string;
}