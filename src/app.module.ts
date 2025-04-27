import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InmuebleModule } from './modules/inmuebles/inmueble.module';
import { ClienteModule } from './modules/clientes/cliente.module';
import { ProveedorModule } from './modules/proveedores/proveedor.module';
import { AlquilerModule } from './modules/alquileres/alquiler.module';
import { ReformaModule } from './modules/reformas/reforma.module';
import { IncidenciaModule } from './modules/incidencias/incidencias.module';
import { MensualidadModule } from './modules/mensualidades/mensualidad.module';
import { UsuarioModule } from './modules/usuarios/usuario.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.NODE_ENV === 'production' ? 'mysql' : 'mariadb',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT ?? '3306'),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'gestion_inmobiliaria',
      autoLoadEntities: true,
      synchronize: true,
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
