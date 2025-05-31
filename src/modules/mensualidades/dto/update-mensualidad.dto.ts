import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateMensualidadDto } from './create-mensualidad.dto';

export class UpdateMensualidadDto extends PartialType(
  OmitType(CreateMensualidadDto, [
    'alquilerId',
    'fechaInicio',
    'fechaFin',
    'fechaEmision',
  ] as const),
) {}