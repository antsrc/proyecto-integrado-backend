import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reforma } from 'src/modules/reformas/reforma.entity';
import { ReformaService } from 'src/modules/reformas/reforma.service';
import { InmuebleReformaController } from './inmueble-reforma.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reforma])],
  controllers: [InmuebleReformaController],
  providers: [ReformaService],
})
export class InmuebleReformaModule {}
