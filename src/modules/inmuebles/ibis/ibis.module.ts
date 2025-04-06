import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ibi } from '../entities/ibi.entity';
import { IbiService } from './ibis.service';
import { IbiController } from './ibis.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ibi])],
  controllers: [IbiController],
  providers: [IbiService],
})
export class IbiModule {}