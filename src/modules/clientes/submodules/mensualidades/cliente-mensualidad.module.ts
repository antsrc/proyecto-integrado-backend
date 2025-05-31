import { Module, forwardRef } from '@nestjs/common';
import { ClienteMensualidadController } from './cliente-mensualidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensualidad } from 'src/modules/mensualidades/mensualidad.entity';
import { MensualidadService } from 'src/modules/mensualidades/mensualidad.service';
import { AlquilerModule } from 'src/modules/alquileres/alquiler.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mensualidad]),
    forwardRef(() => AlquilerModule),
  ],
  controllers: [ClienteMensualidadController],
  providers: [MensualidadService],
})
export class ClienteMensualidadModule {}
