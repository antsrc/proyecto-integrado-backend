import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  Max,
} from 'class-validator';

export class CreateMensualidadDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  alquilerId: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(12)
  @IsNotEmpty()
  mes: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  ano: number;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsNotEmpty()
  importe: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(30)
  formaPago?: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  fechaEmision: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  fechaPago?: Date;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  codFactura: string;
}
