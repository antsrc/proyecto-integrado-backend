import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensualidad } from './mensualidad.entity';
import { MensualidadService } from './mensualidad.service';
import { MensualidadController } from './mensualidad.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Mensualidad])],
  controllers: [MensualidadController],
  providers: [MensualidadService],
  exports: [MensualidadService],
})
export class MensualidadModule {}