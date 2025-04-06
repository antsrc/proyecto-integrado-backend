import { IsInt, IsDecimal, IsOptional, IsDateString } from 'class-validator';

export class UpdateIbiDto {
  @IsInt()
  @IsOptional()
  inmuebleId?: number;

  @IsDateString()
  @IsOptional()
  fechaAbono?: string;

  @IsDecimal()
  @IsOptional()
  importe?: number;
}