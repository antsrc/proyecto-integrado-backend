import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedor } from './proveedor.entity';
import { ProveedorService } from './proveedor.service';
import { ProveedorController } from './proveedor.controller';
import { ObservacionModule } from './submodules/observaciones/observacion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proveedor]),
    ObservacionModule,
  ],
  controllers: [ProveedorController],
  providers: [ProveedorService],
})
export class ProveedorModule {}
