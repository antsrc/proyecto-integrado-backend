import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateProveedorDto } from './create-proveedor.dto';

export class UpdateProveedorDto extends PartialType(
  OmitType(CreateProveedorDto, ['cif'] as const),
) {}
