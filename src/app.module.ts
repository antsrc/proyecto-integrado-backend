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
    InmuebleModule,
    ClienteModule,
    ProveedorModule,
    AlquilerModule,
    ReformaModule,
    IncidenciaModule,
    MensualidadModule,
    UsuarioModule
  ],
  controllers: [AppController],
})
export class AppModule {}
