import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MensualidadService } from './mensualidad.service';
import { MensualidadController } from './mensualidad.controller';
import { Mensualidad } from './mensualidad.entity';
import { AlquilerModule } from '../alquileres/alquiler.module';
import { Cliente } from '../clientes/cliente.entity';
import { Alquiler } from '../alquileres/alquiler.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mensualidad, Alquiler, Cliente]),
  ],
  controllers: [MensualidadController],
  providers: [MensualidadService],
  exports: [MensualidadService],
})
export class MensualidadModule {}