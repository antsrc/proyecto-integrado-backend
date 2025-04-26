import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inmueble } from './inmueble.entity';
import { InmuebleService } from './inmueble.service';
import { InmuebleController } from './inmueble.controller';
import { ObservacionModule } from './submodules/observaciones/observacion.module';
import { FotoModule } from './submodules/fotos/foto.module';
import { SeguroModule } from './submodules/seguros/seguro.module';
import { RentaModule } from './submodules/rentas/renta.module';
import { IbiModule } from './submodules/ibis/ibi.module';
import { InmuebleAlquilerModule } from './submodules/alquileres/inmueble-alquiler.module';
import { InmuebleIncidenciaModule } from './submodules/incidencias/inmueble-incidencia.module';
import { InmuebleMensualidadModule } from './submodules/mensualidades/inmueble-mensualidad.module';
import { InmuebleReformaModule } from './submodules/reformas/inmueble-reforma.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inmueble]),
    ObservacionModule,
    FotoModule,
    SeguroModule,
    RentaModule,
    IbiModule,
    InmuebleAlquilerModule,
    InmuebleIncidenciaModule,
    InmuebleMensualidadModule,
    InmuebleReformaModule
  ],
  controllers: [InmuebleController],
  providers: [InmuebleService],
  exports: [InmuebleService],
})
export class InmuebleModule {}