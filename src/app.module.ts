import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InmueblesModule } from './modules/inmuebles/inmuebles.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'gestion_inmobiliaria',
      autoLoadEntities: true,
      synchronize: true,
    }),
    InmueblesModule,
    CommonModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
