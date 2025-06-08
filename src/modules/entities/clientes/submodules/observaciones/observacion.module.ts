import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observacion } from './observacion.entity';
import { ObservacionService } from './observacion.service';
import { ObservacionController } from './observacion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Observacion])],
  controllers: [ObservacionController],
  providers: [ObservacionService],
})
export class ObservacionModule {}