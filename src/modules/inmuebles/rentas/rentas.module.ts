import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentasService } from './rentas.service';
import { RentasController } from './rentas.controller';
import { Renta } from '../entities/renta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Renta])],
  controllers: [RentasController],
  providers: [RentasService],
})
export class RentasModule {}
