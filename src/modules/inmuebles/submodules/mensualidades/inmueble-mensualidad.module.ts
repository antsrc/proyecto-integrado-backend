import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MensualidadService } from 'src/modules/mensualidades/mensualidad.service';
import { Mensualidad } from 'src/modules/mensualidades/mensualidad.entity';
import { InmuebleMensualidadController } from './inmueble-mensualidad.controller';
import { AlquilerModule } from 'src/modules/alquileres/alquiler.module';
import { Cliente } from 'src/modules/clientes/cliente.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mensualidad, Cliente]),
    forwardRef(() => AlquilerModule),
  ],
  controllers: [InmuebleMensualidadController],
  providers: [MensualidadService],
})
export class InmuebleMensualidadModule {}
