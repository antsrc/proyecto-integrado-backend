import { PartialType } from '@nestjs/swagger';
import { CreateReformaDto } from './create-reforma.dto';

export class UpdateReformaDto extends PartialType(CreateReformaDto) {}
