import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { ObservacionModule } from './submodules/observaciones/observacion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]),
    ObservacionModule
  ],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
