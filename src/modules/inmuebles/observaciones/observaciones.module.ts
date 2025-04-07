import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observacion } from '../entities/observacion.entity';
import { ObservacionesService } from './observaciones.service';
import { ObservacionesController } from './observaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Observacion])],
  controllers: [ObservacionesController],
  providers: [ObservacionesService],
})
export class ObservacionModule {}