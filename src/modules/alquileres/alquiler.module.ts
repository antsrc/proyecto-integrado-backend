import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alquiler } from './alquiler.entity';
import { AlquilerService } from './alquiler.service';
import { AlquilerController } from './alquiler.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Alquiler])],
  controllers: [AlquilerController],
  providers: [AlquilerService],
})
export class AlquilerModule {}