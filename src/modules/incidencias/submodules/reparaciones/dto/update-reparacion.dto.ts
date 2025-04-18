import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateReparacionDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  descripcion?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  observacion?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  fechaFin?: Date;

  @ApiProperty()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  importe?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  codFactura?: string;
}
