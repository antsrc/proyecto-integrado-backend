import { IsInt, IsString, IsOptional } from 'class-validator';

export class UpdateFotoDto {
  @IsString()
  @IsOptional()
  imagen?: string;
}
