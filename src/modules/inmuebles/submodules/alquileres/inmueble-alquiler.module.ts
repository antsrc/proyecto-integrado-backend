import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alquiler } from 'src/modules/alquileres/alquiler.entity';
import { AlquilerService } from 'src/modules/alquileres/alquiler.service';
import { InmuebleAlquilerController } from './inmueble-alquiler.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Alquiler])],
  controllers: [InmuebleAlquilerController],
  providers: [AlquilerService],
})
export class InmuebleAlquilerModule {}