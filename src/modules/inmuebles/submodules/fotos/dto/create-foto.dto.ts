import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFotoDto {
  @ApiProperty()
  @IsString()
  @MaxLength(32)
  imagen: string;
}