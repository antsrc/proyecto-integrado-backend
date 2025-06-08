import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reforma } from './reforma.entity';
import { ReformaService } from './reforma.service';
import { ReformaController } from './reforma.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reforma])],
  controllers: [ReformaController],
  providers: [ReformaService],
})
export class ReformaModule {}