import { IsNotEmpty, IsDecimal, IsInt } from 'class-validator';

export class CreateRentaDto {
  @IsInt()
  @IsNotEmpty()
  ano: number;

  @IsDecimal()
  @IsNotEmpty()
  base: number;

  @IsDecimal()
  @IsNotEmpty()
  comunidad: number;

  @IsDecimal()
  @IsNotEmpty()
  iva: number;

  @IsDecimal()
  @IsNotEmpty()
  total: number;

  @IsInt()
  @IsNotEmpty()
  inmuebleId: number;
}
