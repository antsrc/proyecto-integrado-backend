import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, Min, Max } from 'class-validator';

export class CreateIbiDto {
  @ApiProperty()
  @IsDateString()
  fechaAbono: Date;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @Max(999999.99, { message: 'El importe no puede ser mayor de 999999.99' })
  importe: number;
}
