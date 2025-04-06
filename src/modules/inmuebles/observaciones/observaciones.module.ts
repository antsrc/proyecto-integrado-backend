import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observacion } from '../entities/observacion.entity';
import { ObservacionService } from './observaciones.service';
import { ObservacionController } from './observaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Observacion])],
  controllers: [ObservacionController],
  providers: [ObservacionService],
})
export class ObservacionModule {}