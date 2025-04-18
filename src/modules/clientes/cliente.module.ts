import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { ObservacionModule } from './submodules/observaciones/observacion.module';
import { ClienteAlquilerModule } from './submodules/alquileres/cliente-alquiler.module';
import { ClienteIncidenciaModule } from './submodules/incidencias/cliente-incidencia.module';
import { ClienteMensualidadModule } from './submodules/mensualidades/cliente-mensualidad.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]),
    ObservacionModule,
    ClienteAlquilerModule,
    ClienteIncidenciaModule,
    ClienteMensualidadModule,
  ],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
