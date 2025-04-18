import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateReparacionDto {
  @ApiProperty()
  @IsNotEmpty()
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
  fechaFin: Date;

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
