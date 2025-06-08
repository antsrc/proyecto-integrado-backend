import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateObservacionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  comentario: string;
}
