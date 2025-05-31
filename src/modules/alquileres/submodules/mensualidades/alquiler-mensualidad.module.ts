import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlquilerMensualidadController } from './alquiler-mensualidad.controller';
import { MensualidadService } from 'src/modules/mensualidades/mensualidad.service';
import { Mensualidad } from 'src/modules/mensualidades/mensualidad.entity';
import { AlquilerModule } from 'src/modules/alquileres/alquiler.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mensualidad]),
    forwardRef(() => AlquilerModule),
  ],
  controllers: [AlquilerMensualidadController],
  providers: [MensualidadService],
})
export class AlquilerMensualidadModule {}
