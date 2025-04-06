import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Foto } from '../entities/foto.entity';
import { FotoService } from './fotos.service';
import { FotoController } from './fotos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Foto])],
  controllers: [FotoController],
  providers: [FotoService],
})
export class FotoModule {}