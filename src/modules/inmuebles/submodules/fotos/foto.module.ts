import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Foto } from './foto.entity';
import { FotoService } from './foto.service';
import { FotoController } from './foto.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Foto])],
  controllers: [FotoController],
  providers: [FotoService],
})
export class FotoModule {}