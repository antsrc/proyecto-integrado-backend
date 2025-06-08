import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ibi } from './ibi.entity';
import { IbisService } from './ibi.service';
import { IbisController } from './ibi.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ibi])],
  controllers: [IbisController],
  providers: [IbisService],
})
export class IbiModule {}