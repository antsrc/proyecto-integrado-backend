import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { InmuebleModule } from './modules/inmuebles/inmueble.module';
import { ClienteModule } from './modules/clientes/cliente.module';
import { ProveedorModule } from './modules/proveedores/proveedor.module';
import { AlquilerModule } from './modules/alquileres/alquiler.module';
import { ReformaModule } from './modules/reformas/reforma.module';
import { IncidenciaModule } from './modules/incidencias/incidencias.module';
import { MensualidadModule } from './modules/mensualidades/mensualidad.module';
import { UsuarioModule } from './modules/usuarios/usuario.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => ({
        type: config.get<'mysql' | 'mariadb'>('DB_TYPE') as 'mysql' | 'mariadb',
        host: config.get<string>('DB_HOST'),
        port: parseInt(config.get<string>('DB_PORT') || '3306'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        retryAttempts: 10,
        retryDelay: 3000,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    InmuebleModule,
    ClienteModule,
    ProveedorModule,
    AlquilerModule,
    ReformaModule,
    IncidenciaModule,
    MensualidadModule,
    UsuarioModule,
    AuthModule
  ],
  controllers: [AppController],
})
export class AppModule {}
