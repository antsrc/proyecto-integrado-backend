import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SegurosService } from './seguros.service';
import { SegurosController } from './seguros.controller';
import { Seguro } from '../entities/seguro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seguro])],
  controllers: [SegurosController],
  providers: [SegurosService],
})
export class SegurosModule {}