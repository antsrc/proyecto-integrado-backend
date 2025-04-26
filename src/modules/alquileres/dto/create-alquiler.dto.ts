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
import { Transform, Type } from 'class-transformer';

export class CreateAlquilerDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  clienteId: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  inmuebleId: number;

  @ApiProperty()
  @IsDateString()
  fechaAlta: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => value === '' ? undefined : value)
  fechaBaja?: Date;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  fianza: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  codContrato: string;
}