import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacionController } from './notificacion.controller';
import { NotificacionService } from './notificacion.service';
import { Mensualidad } from '../../entities/mensualidades/mensualidad.entity';
import { Alquiler } from '../../entities/alquileres/alquiler.entity';
import { Incidencia } from '../../entities/incidencias/incidencia.entity';
import { Reforma } from '../../entities/reformas/reforma.entity';
import { Reparacion } from '../../entities/reparaciones/reparacion.entity';

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
