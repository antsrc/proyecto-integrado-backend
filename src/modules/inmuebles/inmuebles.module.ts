import { Module } from '@nestjs/common';
import { InmueblesService } from './inmuebles.service';
import { InmueblesController } from './inmuebles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inmueble } from './entities/inmueble.entity';
import { RentasModule } from './rentas/rentas.module';
import { IbiModule } from './ibis/ibis.module';
import { SegurosModule } from './seguros/seguros.module';
import { FotoModule } from './fotos/fotos.module';
import { ObservacionModule } from './observaciones/observaciones.module';

@Module({
  imports: [TypeOrmModule.forFeature([Inmueble]), RentasModule, IbiModule, SegurosModule, FotoModule, ObservacionModule],
  controllers: [InmueblesController],
  providers: [InmueblesService],
})
export class InmueblesModule {}