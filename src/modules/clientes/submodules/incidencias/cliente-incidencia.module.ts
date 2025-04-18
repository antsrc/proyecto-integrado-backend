import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incidencia } from 'src/modules/incidencias/incidencia.entity';
import { IncidenciaService } from 'src/modules/incidencias/incidencia.service';
import { ClienteIncidenciaController } from './cliente-incidencia.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Incidencia])],
  controllers: [ClienteIncidenciaController],
  providers: [IncidenciaService],
})
export class ClienteIncidenciaModule {}