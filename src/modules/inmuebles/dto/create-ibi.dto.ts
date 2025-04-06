import { IsInt, IsDecimal, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateIbiDto {
  @IsInt()
  @IsNotEmpty()
  inmuebleId: number;

  @IsDateString()
  @IsNotEmpty()
  fechaAbono: string;

  @IsDecimal()
  @IsNotEmpty()
  importe: number;
}