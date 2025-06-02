import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateInmuebleDto } from './create-inmueble.dto';

export class UpdateInmuebleDto extends PartialType(
  OmitType(CreateInmuebleDto, ['refCatastral'])
) {}
