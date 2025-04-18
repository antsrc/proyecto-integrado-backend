import { IsString, IsDateString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSeguroDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  nombre: string;

  @ApiProperty()
  @IsDateString()
  fechaAlta: Date;

  @ApiProperty()
  @IsDateString()
  fechaVencimiento: Date;

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  tfnoAsistencia: string;

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  numPoliza: string;
}
