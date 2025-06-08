import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { InmuebleModule } from './modules/entities/inmuebles/inmueble.module';
import { ClienteModule } from './modules/entities/clientes/cliente.module';
import { ProveedorModule } from './modules/entities/proveedores/proveedor.module';
import { AlquilerModule } from './modules/entities/alquileres/alquiler.module';
import { ReformaModule } from './modules/entities/reformas/reforma.module';
import { IncidenciaModule } from './modules/entities/incidencias/incidencias.module';
import { MensualidadModule } from './modules/entities/mensualidades/mensualidad.module';
import { UsuarioModule } from './modules/usuarios/usuario.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificacionModule } from './modules/utils/notificaciones/notificacion.module';
import { LogsModule } from './modules/utils/logs/logs.module';
import { ErrorModule } from './auxiliar/error.module';

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
    AuthModule,
    NotificacionModule,
    LogsModule,
    ErrorModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
