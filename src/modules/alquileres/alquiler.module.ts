import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alquiler } from './alquiler.entity';
import { AlquilerService } from './alquiler.service';
import { AlquilerController } from './alquiler.controller';
import { AlquilerMensualidadModule } from './submodules/mensualidades/alquiler-mensualidad.module';

@Module({
  imports: [TypeOrmModule.forFeature([Alquiler]), forwardRef(() => AlquilerMensualidadModule)],
  controllers: [AlquilerController],
  providers: [AlquilerService],
  exports: [AlquilerService],
})
export class AlquilerModule {}
