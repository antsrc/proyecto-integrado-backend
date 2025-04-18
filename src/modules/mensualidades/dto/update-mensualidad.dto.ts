import { PartialType } from '@nestjs/swagger';
import { CreateMensualidadDto } from './create-mensualidad.dto';

export class UpdateMensualidadDto extends PartialType(CreateMensualidadDto) {}