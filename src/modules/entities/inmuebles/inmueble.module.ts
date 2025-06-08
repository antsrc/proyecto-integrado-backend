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

@Module({
  imports: [
    TypeOrmModule.forFeature([Inmueble]),
    ObservacionModule,
    FotoModule,
    SeguroModule,
    RentaModule,
    IbiModule
  ],
  controllers: [InmuebleController],
  providers: [InmuebleService],
  exports: [InmuebleService],
})
export class InmuebleModule {}