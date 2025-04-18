import { PartialType } from '@nestjs/swagger';
import { CreateIbiDto } from './create-ibi.dto';

export class UpdateIbiDto extends PartialType(CreateIbiDto) {}