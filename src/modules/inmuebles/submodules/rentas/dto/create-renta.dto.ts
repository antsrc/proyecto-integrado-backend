import { IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRentaDto {
  @ApiProperty()
  @IsNumber()
  ano: number;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(999999.99, { message: 'La base no puede ser mayor de 999999.99' })
  base: number;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(999999.99, { message: 'La comunidad no puede ser mayor de 999999.99' })
  comunidad: number;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(99.99, { message: 'El IVA no puede ser mayor de 99.99' })
  ivaPorcentaje: number;
}