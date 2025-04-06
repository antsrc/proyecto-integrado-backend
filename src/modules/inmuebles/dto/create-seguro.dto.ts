import { IsInt, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateSeguroDto {
  @IsInt()
  @IsNotEmpty()
  inmueble_id: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsDate()
  @IsNotEmpty()
  fecha_alta: Date;

  @IsDate()
  @IsNotEmpty()
  fecha_vencimiento: Date;

  @IsString()
  @IsNotEmpty()
  tfno_asistencia: string;

  @IsString()
  @IsNotEmpty()
  poliza_doc: string;
}
