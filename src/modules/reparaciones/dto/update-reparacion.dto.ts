import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateReparacionDto } from './create-reparacion.dto';

export class UpdateReparacionDto extends PartialType(
  OmitType(CreateReparacionDto, [
    'incidenciaId',
    'proveedorId',
    'fechaFin',
    'importe',
  ] as const),
) {}
