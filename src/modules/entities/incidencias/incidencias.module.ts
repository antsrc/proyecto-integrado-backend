import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incidencia } from './incidencia.entity';
import { IncidenciaService } from './incidencia.service';
import { IncidenciaController } from './incidencia.controller';
import { TipoModule } from './submodules/tipos/tipo.module';
import { ReparacionModule } from '../reparaciones/reparacion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Incidencia]),
    TipoModule,
    ReparacionModule,
  ],
  controllers: [IncidenciaController],
  providers: [IncidenciaService],
})
export class IncidenciaModule {}