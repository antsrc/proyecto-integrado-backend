import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReparacionDto {
  @ApiProperty()
  @IsNumber({}, { message: 'La incidencia no es válida' })
  @IsNotEmpty({ message: 'La incidencia es obligatoria' })
  @Type(() => Number)
  incidenciaId: number;

  @ApiProperty()
  @IsNumber({}, { message: 'El proveedor no es válido' })
  @IsNotEmpty({ message: 'El proveedor es obligatorio' })
  @Type(() => Number)
  proveedorId: number;

  @ApiProperty()
  @IsDateString({}, { message: 'La fecha de fin debe tener formato de fecha válido (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'La fecha de fin es obligatoria' })
  fechaFin: Date;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El importe debe ser un número con hasta 2 decimales' })
  @Min(1, { message: 'El importe no puede ser menor de 1' })
  @IsNotEmpty({ message: 'El importe es obligatorio' })
  @Type(() => Number)
  @Max(999999.99, { message: 'El importe no puede tener más de 6 dígitos enteros' })
  importe: number;

  @ApiProperty()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  descripcion: string;
}