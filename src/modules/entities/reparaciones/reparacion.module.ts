import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reparacion } from './reparacion.entity';
import { ReparacionService } from './reparacion.service';
import { ReparacionController } from './reparacion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reparacion])],
  controllers: [ReparacionController],
  providers: [ReparacionService],
})
export class ReparacionModule {}
