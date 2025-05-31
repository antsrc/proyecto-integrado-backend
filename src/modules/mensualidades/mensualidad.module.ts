import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MensualidadService } from './mensualidad.service';
import { MensualidadController } from './mensualidad.controller';
import { Mensualidad } from './mensualidad.entity';
import { AlquilerModule } from '../alquileres/alquiler.module';

@Module({
  imports: [TypeOrmModule.forFeature([Mensualidad]), forwardRef(() => AlquilerModule)],
  controllers: [MensualidadController],
  providers: [MensualidadService],
  exports: [MensualidadService],
})
export class MensualidadModule {}