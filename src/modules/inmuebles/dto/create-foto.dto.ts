import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFotoDto {
  @IsString()
  @IsNotEmpty()
  imagen: string;
}
