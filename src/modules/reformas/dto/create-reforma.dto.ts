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

export class CreateReformaDto {
  @ApiProperty()
  @IsNumber()
  inmuebleId: number;

  @ApiProperty()
  @IsNumber()
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
  fechaFin?: Date;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  importe: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  codFactura: string;
}