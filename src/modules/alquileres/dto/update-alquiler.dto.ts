import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateAlquilerDto } from './create-alquiler.dto';

export class UpdateAlquilerDto extends PartialType(
  OmitType(CreateAlquilerDto, ['clienteId', 'inmuebleId'] as const),
) {}