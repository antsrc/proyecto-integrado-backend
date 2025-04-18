import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, Min } from 'class-validator';

export class CreateIbiDto {
  @ApiProperty()
  @IsDateString()
  fechaAbono: Date;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  importe: number;
}
