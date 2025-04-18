import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alquiler } from 'src/modules/alquileres/alquiler.entity';
import { AlquilerService } from 'src/modules/alquileres/alquiler.service';
import { ClienteAlquilerController } from './cliente-alquiler.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Alquiler])],
  controllers: [ClienteAlquilerController],
  providers: [AlquilerService],
})
export class ClienteAlquilerModule {}