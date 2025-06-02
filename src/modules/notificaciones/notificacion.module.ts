import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacionController } from './notificacion.controller';
import { NotificacionService } from './notificacion.service';
import { Mensualidad } from '../mensualidades/mensualidad.entity';
import { Alquiler } from '../alquileres/alquiler.entity';
import { Incidencia } from '../incidencias/incidencia.entity';
import { Reforma } from '../reformas/reforma.entity';
import { Reparacion } from '../reparaciones/reparacion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Mensualidad,
      Alquiler,
      Incidencia,
      Reforma,
      Reparacion
    ]),
  ],
  controllers: [NotificacionController],
  providers: [NotificacionService],
  exports: [NotificacionService],
})
export class NotificacionModule {}
