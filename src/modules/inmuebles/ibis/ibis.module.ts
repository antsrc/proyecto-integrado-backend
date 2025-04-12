import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ibi } from '../entities/ibi.entity';
import { IbisService } from './ibis.service';
import { IbisController } from './ibis.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ibi])],
  controllers: [IbisController],
  providers: [IbisService],
})
export class IbisModule {}