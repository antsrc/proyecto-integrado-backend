import { Module } from '@nestjs/common';
import { ClienteMensualidadController } from './cliente-mensualidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensualidad } from 'src/modules/mensualidades/mensualidad.entity';
import { MensualidadService } from 'src/modules/mensualidades/mensualidad.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mensualidad])],
  controllers: [ClienteMensualidadController],
  providers: [MensualidadService],
})
export class ClienteMensualidadModule {}
