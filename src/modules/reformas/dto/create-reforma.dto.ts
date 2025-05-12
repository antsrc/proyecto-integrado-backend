import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateReformaDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  inmuebleId: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  proveedorId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  descripcion: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  observacion: string;

  @ApiProperty()
  @IsDateString()
  fechaInicio: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => (value === '' ? undefined : value))
  fechaFin?: Date;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  importe: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  codFactura: string;
}