import { PartialType } from '@nestjs/swagger';
import { CreateObservacionDto } from './create-observacion.dto';

export class UpdateObservacionDto extends PartialType(CreateObservacionDto) {}