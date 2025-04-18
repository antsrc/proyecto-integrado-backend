import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reforma } from 'src/modules/reformas/reforma.entity';
import { ReformaService } from 'src/modules/reformas/reforma.service';
import { ProveedorReformaController } from './proveedor-reforma.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reforma])],
  controllers: [ProveedorReformaController],
  providers: [ReformaService],
})
export class ProveedorReformaModule {}
