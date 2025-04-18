import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlquilerMensualidadController } from './alquiler-mensualidad.controller';
import { MensualidadService } from 'src/modules/mensualidades/mensualidad.service';
import { Mensualidad } from 'src/modules/mensualidades/mensualidad.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mensualidad]),
  ],
  controllers: [AlquilerMensualidadController],
  providers: [MensualidadService],
})
export class AlquilerMensualidadModule {}
