import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SegurosService } from './seguro.service';
import { SegurosController } from './seguro.controller';
import { Seguro } from './seguro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seguro])],
  controllers: [SegurosController],
  providers: [SegurosService],
})
export class SeguroModule {}