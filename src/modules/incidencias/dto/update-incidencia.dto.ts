import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateIncidenciaDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  proveedorAvisadoId?: number;
}
