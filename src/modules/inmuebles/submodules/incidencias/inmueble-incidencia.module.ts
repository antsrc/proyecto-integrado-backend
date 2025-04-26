import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incidencia } from 'src/modules/incidencias/incidencia.entity';
import { IncidenciaService } from 'src/modules/incidencias/incidencia.service';
import { InmuebleIncidenciaController } from './inmueble-incidencia.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Incidencia])],
  controllers: [InmuebleIncidenciaController],
  providers: [IncidenciaService],
})
export class InmuebleIncidenciaModule {}