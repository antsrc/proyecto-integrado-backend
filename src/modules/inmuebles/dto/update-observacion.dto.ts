import { IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateObservacionDto {
  @IsString()
  @IsOptional()
  comentario?: string;

  @IsDateString()
  @IsOptional()
  fecha?: string;
}