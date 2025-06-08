import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentaService } from './renta.service';
import { RentaController } from './renta.controller';
import { Renta } from './renta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Renta])],
  controllers: [RentaController],
  providers: [RentaService],
})
export class RentaModule {}
