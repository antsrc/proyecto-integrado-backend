import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inmueble } from './entities/inmueble.entity';
import { InmueblesService } from './inmuebles.service';
import { InmueblesController } from './inmuebles.controller';
import { ObservacionModule } from './observaciones/observaciones.module';
import { FotosModule } from './fotos/fotos.module';
import { SegurosModule } from './seguros/seguros.module';
import { RentasModule } from './rentas/rentas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inmueble]),
    ObservacionModule,
    FotosModule,
    SegurosModule,
    RentasModule,
  ],
  controllers: [InmueblesController],
  providers: [InmueblesService],
  exports: [InmueblesService],
})
export class InmueblesModule {}