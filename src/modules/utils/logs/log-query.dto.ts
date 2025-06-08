import { IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class LogQueryDto {
  @Type(() => Number)
  @IsInt({ message: 'El número de líneas debe ser un entero' })
  @Min(1, { message: 'El número de líneas debe ser al menos 1' })
  @Max(100, { message: 'El número de líneas no puede ser mayor que 100' })
  n: number;
}
