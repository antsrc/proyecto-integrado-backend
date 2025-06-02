import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';
import { CreateIncidenciaDto } from './create-incidencia.dto';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateIncidenciaDto extends PartialType(
  OmitType(CreateIncidenciaDto, ['alquilerId'] as const),
) {
  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'El proveedor avisado no es válido' })
  @Transform(({ value }) => {
    const n = Number(value);
    return value === '' || value === undefined || value === null || isNaN(n)
      ? null
      : n;
  })
  proveedorAvisadoId?: number;
}
