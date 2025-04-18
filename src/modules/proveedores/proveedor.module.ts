import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedor } from './proveedor.entity';
import { ProveedorService } from './proveedor.service';
import { ProveedorController } from './proveedor.controller';
import { ObservacionModule } from './submodules/observaciones/observacion.module';
import { ProveedorReformaModule } from './submodules/reformas/proveedor-reforma.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proveedor]),
    ObservacionModule,
    ProveedorReformaModule,
  ],
  controllers: [ProveedorController],
  providers: [ProveedorService],
})
export class ProveedorModule {}
