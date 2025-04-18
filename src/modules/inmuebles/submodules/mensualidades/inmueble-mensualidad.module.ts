import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MensualidadService } from 'src/modules/mensualidades/mensualidad.service';
import { Mensualidad } from 'src/modules/mensualidades/mensualidad.entity';
import { InmuebleMensualidadController } from './inmueble-mensualidad.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Mensualidad])],
  controllers: [InmuebleMensualidadController],
  providers: [MensualidadService],
})
export class InmuebleMensualidadModule {}
