import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateAlquilerDto {
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  fechaAlta?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  fechaBaja?: Date;

  @ApiProperty()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  fianza?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  codContrato?: string;
}