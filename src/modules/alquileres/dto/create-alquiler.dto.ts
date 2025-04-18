import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateAlquilerDto {
  @ApiProperty()
  @IsNumber()
  clienteId: number;

  @ApiProperty()
  @IsNumber()
  inmuebleId: number;

  @ApiProperty()
  @IsDateString()
  fechaAlta: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  fechaBaja?: Date;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  fianza: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  codContrato: string;
}