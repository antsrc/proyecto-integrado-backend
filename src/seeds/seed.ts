import { DataSource } from 'typeorm';
import { Alquiler } from '../modules/alquileres/alquiler.entity';
import { Cliente } from '../modules/clientes/cliente.entity';
import { Incidencia } from '../modules/incidencias/incidencia.entity';
import { Inmueble } from '../modules/inmuebles/inmueble.entity';
import { Mensualidad } from '../modules/mensualidades/mensualidad.entity';
import { Proveedor } from '../modules/proveedores/proveedor.entity';
import { Reforma } from '../modules/reformas/reforma.entity';
import { Usuario } from '../modules/usuarios/usuario.entity';
import { Ibi } from '../modules/inmuebles/submodules/ibis/ibi.entity';
import { Renta } from '../modules/inmuebles/submodules/rentas/renta.entity';
import { Foto } from '../modules/inmuebles/submodules/fotos/foto.entity';
import { Seguro } from '../modules/inmuebles/submodules/seguros/seguro.entity';
import { Observacion as ObservacionCliente } from '../modules/clientes/submodules/observaciones/observacion.entity';
import { Observacion as ObservacionInmueble } from '../modules/inmuebles/submodules/observaciones/observacion.entity';
import { Observacion as ObservacionProveedor } from '../modules/proveedores/submodules/observaciones/observacion.entity';
import { Tipo as TipoIncidencia } from '../modules/incidencias/submodules/tipos/tipo.entity';
import { Reparacion } from 'src/modules/reparaciones/reparacion.entity';

const seedDatabase = async (dataSource: DataSource) => {

  await dataSource.query('SET FOREIGN_KEY_CHECKS = 0');

  const dbName = process.env.DB_NAME || 'gestion_inmobiliaria';

  const tables: { TABLE_NAME: string }[] = await dataSource.query(`
    SELECT TABLE_NAME 
    FROM information_schema.tables 
    WHERE table_schema = '${dbName}'
  `);  

  for (const { TABLE_NAME } of tables) {
    if (TABLE_NAME !== 'migrations') {
      await dataSource.query(`DELETE FROM \`${TABLE_NAME}\``);
    }
  }

  for (const { TABLE_NAME } of tables) {
    if (TABLE_NAME !== 'migrations') {
      await dataSource.query(`TRUNCATE TABLE \`${TABLE_NAME}\``);
    }
  }

  await dataSource.query('SET FOREIGN_KEY_CHECKS = 1');

  console.log('Base de datos reseteada');

  const clienteRepository = dataSource.getRepository(Cliente);
  const inmuebleRepository = dataSource.getRepository(Inmueble);
  const alquilerRepository = dataSource.getRepository(Alquiler);
  const proveedorRepository = dataSource.getRepository(Proveedor);
  const incidenciaRepository = dataSource.getRepository(Incidencia);
  const tipoIncidenciaRepository = dataSource.getRepository(TipoIncidencia);
  const mensualidadRepository = dataSource.getRepository(Mensualidad);
  const reformaRepository = dataSource.getRepository(Reforma);
  const ibiRepository = dataSource.getRepository(Ibi);
  const rentaRepository = dataSource.getRepository(Renta);
  const fotoRepository = dataSource.getRepository(Foto);
  const seguroRepository = dataSource.getRepository(Seguro);
  const reparacionRepository = dataSource.getRepository(Reparacion);
  const observacionClienteRepository =
    dataSource.getRepository(ObservacionCliente);
  const observacionInmuebleRepository =
    dataSource.getRepository(ObservacionInmueble);
  const observacionProveedorRepository =
    dataSource.getRepository(ObservacionProveedor);

  // Crear clientes si no existen
  for (const cliente of [
    {
      dni: '12345678A',
      nombreCompleto: 'Juan Pérez',
      telefono: '600123456',
      email: 'juan.perez@example.com',
      num_cuent: 'ES7620770024003102575766',
      referido_por: 'Pedro López',
      deuda: 0,
    },
    {
      dni: '87654321B',
      nombreCompleto: 'Ana García',
      telefono: '600654321',
      email: 'ana.garcia@example.com',
      num_cuent: 'ES9121000418450200051332',
      referido_por: 'María Fernández',
      deuda: 100,
    },
  ]) {
    const exists = await clienteRepository.findOneBy({ dni: cliente.dni });
    if (!exists) {
      await clienteRepository.save(cliente);
    }
  }

  // Crear inmuebles si no existen
  for (const inmueble of [
    {
      codigo: 'INM001',
      direccion: 'Calle Falsa 123',
      cod_postal: '28001',
      municipio: 'Madrid',
      provincia: 'Madrid',
      tipo: 'Piso',
      metros_cuadrados: 80.5,
      ref_catastral: '1234567890ABC',
    },
    {
      codigo: 'INM002',
      direccion: 'Avenida Siempre Viva 742',
      cod_postal: '28002',
      municipio: 'Madrid',
      provincia: 'Madrid',
      tipo: 'Casa',
      metros_cuadrados: 120.0,
      ref_catastral: '0987654321XYZ',
    },
  ]) {
    const exists = await inmuebleRepository.findOneBy({
      codigo: inmueble.codigo,
    });
    if (!exists) {
      await inmuebleRepository.save(inmueble);
    }
  }

  // Crear alquileres si no existen
  for (const alquiler of [
    {
      cliente: { id: 1 },
      inmueble: { id: 1 },
      fechaAlta: new Date('2025-01-01'),
      fechaBaja: null,
      fianza: 1000.0,
      codContrato: 'CONTRATO001',
    },
    {
      cliente: { id: 2 },
      inmueble: { id: 2 },
      fechaAlta: new Date('2025-02-01'),
      fechaBaja: null,
      fianza: 1200.0,
      codContrato: 'CONTRATO002',
    },
  ]) {
    const exists = await alquilerRepository.findOneBy({
      // codigo: alquiler.codigo,
    });
    if (!exists) {
      await alquilerRepository.save(alquiler);
    }
  }

  // Crear proveedores si no existen
  for (const proveedor of [
    {
      cif: 'B12345678',
      nombre: 'Proveedor 1',
      direccion: 'Calle Proveedor 1',
      telefono: '600123456',
      descripcion: 'Proveedor de servicios eléctricos',
    },
    {
      cif: 'B87654321',
      nombre: 'Proveedor 2',
      direccion: 'Calle Proveedor 2',
      telefono: '600654321',
      descripcion: 'Proveedor de servicios de fontanería',
    },
  ]) {
    const exists = await proveedorRepository.findOneBy({ cif: proveedor.cif });
    if (!exists) {
      await proveedorRepository.save(proveedor);
    }
  }

  // Crear tipos de incidencia si no existen
  for (const tipo of [
    {
      nombre: 'Eléctrica',
      descripcion: 'Problemas relacionados con instalaciones eléctricas.',
    },
    {
      nombre: 'Fontanería',
      descripcion: 'Problemas relacionados con tuberías y grifos.',
    },
    {
      nombre: 'Carpintería',
      descripcion: 'Problemas relacionados con puertas, ventanas y muebles.',
    },
  ]) {
    const exists = await tipoIncidenciaRepository.findOneBy({
      nombre: tipo.nombre,
    });
    if (!exists) {
      await tipoIncidenciaRepository.save(tipo);
    }
  }

  // Crear incidencias si no existen
  for (const incidencia of [
    {
      descripcion: 'Incidencia de prueba 1',
      fechaRegistro: new Date('2025-01-01'),
      alquiler: { id: 1 },
      proveedorAvisado: { id: 1 },
      tipo: { id: 1 },
    },
    {
      descripcion: 'Incidencia de prueba 2',
      fechaRegistro: new Date('2025-02-01'),
      alquiler: { id: 2 },
      proveedorAvisado: { id: 2 },
      tipo: { id: 2 },
    },
  ]) {
    const exists = await incidenciaRepository.findOneBy({
      descripcion: incidencia.descripcion,
    });
    if (!exists) {
      // await incidenciaRepository.save(incidencia);
    }
  }

  // Crear mensualidades si no existen
  for (const mensualidad of [
    {
      alquiler: { id: 1 },
      mes: 1,
      ano: 2025,
      importe: 750.0,
      formaPago: 'Transferencia',
      fechaEmision: new Date('2025-01-01'),
      fechaPago: new Date('2025-01-05'),
      codFactura: 'FAC001',
    },
    {
      alquiler: { id: 2 },
      mes: 2,
      ano: 2025,
      importe: 850.0,
      formaPago: 'Efectivo',
      fechaEmision: new Date('2025-02-01'),
      fechaPago: new Date('2025-02-10'),
      codFactura: 'FAC002',
    },
  ]) {
    const exists = await mensualidadRepository.findOneBy({
      // codFactura: mensualidad.codFactura,
    });
    if (!exists) {
      await mensualidadRepository.save(mensualidad);
    }
  }

  // Crear reformas si no existen
  for (const reforma of [
    {
      inmueble: { id: 1 },
      proveedor: { id: 1 },
      descripcion: 'Reforma de cocina',
      observacion: 'Incluye cambio de azulejos',
      fechaInicio: new Date('2025-03-01'),
      fechaFin: new Date('2025-03-15'),
      importe: 5000.0,
      codFactura: 'REF001',
    },
    {
      inmueble: { id: 2 },
      proveedor: { id: 2 },
      descripcion: 'Reforma de baño',
      observacion: 'Incluye instalación de ducha nueva',
      fechaInicio: new Date('2025-04-01'),
      fechaFin: new Date('2025-04-10'),
      importe: 3000.0,
      codFactura: 'REF002',
    },
  ]) {
    const exists = await reformaRepository.findOneBy({
      // codigo: reforma.codigo,
    });
    if (!exists) {
      await reformaRepository.save(reforma);
    }
  }

  // Crear IBIs si no existen
  for (const ibi of [
    {
      inmueble: { id: 1 },
      fechaAbono: new Date('2025-01-15'),
      importe: 300.0,
    },
    {
      inmueble: { id: 2 },
      fechaAbono: new Date('2025-02-15'),
      importe: 400.0,
    },
  ]) {
    const exists = await ibiRepository.findOneBy({
      inmueble: ibi.inmueble,
      fechaAbono: ibi.fechaAbono,
    });
    if (!exists) {
      await ibiRepository.save(ibi);
    }
  }

  // Crear rentas si no existen
  for (const renta of [
    {
      inmueble: { id: 1 },
      ano: 2025,
      base: 1000.0,
      comunidad: 200.0,
      ivaPorcentaje: 21.0,
    },
    {
      inmueble: { id: 2 },
      ano: 2025,
      base: 1200.0,
      comunidad: 250.0,
      ivaPorcentaje: 21.0,
    },
  ]) {
    const exists = await rentaRepository.findOneBy({
      inmueble: renta.inmueble,
      ano: renta.ano,
    });
    if (!exists) {
      await rentaRepository.save(renta);
    }
  }

  // Crear fotos si no existen
  for (const foto of [
    {
      inmueble: { id: 1 },
      imagen: '151215f19619c093038e03c5d9d3e825',
    },
    {
      inmueble: { id: 2 },
      imagen: '55b22d65929baaecdffd007a52d647dc',
    },
  ]) {
    const exists = await fotoRepository.findOneBy({ imagen: foto.imagen });
    if (!exists) {
      await fotoRepository.save(foto);
    }
  }

  // Crear seguros si no existen
  for (const seguro of [
    {
      inmueble: { id: 1 },
      nombre: 'Seguro Hogar Básico',
      fechaAlta: new Date('2025-01-01'),
      fechaVencimiento: new Date('2026-01-01'),
      tfnoAsistencia: '900123456',
      numPoliza: 'POL123456',
    },
    {
      inmueble: { id: 2 },
      nombre: 'Seguro Hogar Premium',
      fechaAlta: new Date('2025-02-01'),
      fechaVencimiento: new Date('2026-02-01'),
      tfnoAsistencia: '900654321',
      numPoliza: 'POL654321',
    },
  ]) {
    const exists = await seguroRepository.findOneBy({
      numPoliza: seguro.numPoliza,
    });
    if (!exists) {
      await seguroRepository.save(seguro);
    }
  }

  // Crear observaciones para clientes si no existen
  for (const observacion of [
    {
      cliente: { id: 1 },
      comentario: 'Cliente puntual en los pagos.',
      fecha: new Date('2025-03-01'),
    },
    {
      cliente: { id: 2 },
      comentario: 'Cliente con historial de retrasos.',
      fecha: new Date('2025-03-15'),
    },
  ]) {
    const exists = await observacionClienteRepository.findOneBy({
      cliente: observacion.cliente,
      fecha: observacion.fecha,
    });
    if (!exists) {
      await observacionClienteRepository.save(observacion);
    }
  }

  // Crear observaciones para inmuebles si no existen
  for (const observacion of [
    {
      inmueble: { id: 1 },
      comentario: 'Inmueble en buen estado.',
      fecha: new Date('2025-04-01'),
    },
    {
      inmueble: { id: 2 },
      comentario: 'Inmueble necesita reparaciones.',
      fecha: new Date('2025-04-15'),
    },
  ]) {
    const exists = await observacionInmuebleRepository.findOneBy({
      inmueble: observacion.inmueble,
      fecha: observacion.fecha,
    });
    if (!exists) {
      await observacionInmuebleRepository.save(observacion);
    }
  }

  // Crear observaciones para proveedores si no existen
  for (const observacion of [
    {
      proveedor: { id: 1 },
      comentario: 'Proveedor confiable y puntual.',
      fecha: new Date('2025-04-10'),
    },
    {
      proveedor: { id: 2 },
      comentario: 'Proveedor con retrasos en entregas.',
      fecha: new Date('2025-04-20'),
    },
  ]) {
    const exists = await observacionProveedorRepository.findOneBy({
      proveedor: observacion.proveedor,
      fecha: observacion.fecha,
    });
    if (!exists) {
      await observacionProveedorRepository.save(observacion);
    }
  }

  // Crear reparaciones si no existen
  for (const reparacion of [
    {
      incidencia: { id: 1 },
      proveedor: { id: 1 },
      descripcion: 'Cambio de enchufe quemado',
      observacion: 'El enchufe presentaba signos de sobrecalentamiento.',
      fechaFin: new Date('2025-01-10'),
      importe: 150.0,
      codFactura: 'REP001',
    },
    {
      incidencia: { id: 2 },
      proveedor: { id: 2 },
      descripcion: 'Reparación de fuga en el baño',
      observacion: 'Se sustituyó la tubería dañada.',
      fechaFin: new Date('2025-02-15'),
      importe: 200.0,
      codFactura: 'REP002',
    },
  ]) {
    const exists = await reparacionRepository.findOneBy({
      // codFactura: reparacion.codFactura,
    });
    if (!exists) {
      await reparacionRepository.save(reparacion);
    }
  }
};

const isProduction = process.env.NODE_ENV === 'production';

const AppDataSource = new DataSource({
  type: 'mariadb',
  host: isProduction ? process.env.DB_HOST : 'localhost',
  port: isProduction ? Number(process.env.DB_PORT) : 3306,
  username: isProduction ? process.env.DB_USER : 'root',
  password: isProduction ? process.env.DB_PASSWORD : 'root',
  database: isProduction ? process.env.DB_NAME : 'gestion_inmobiliaria',
  synchronize: true,
  entities: [
    Alquiler,
    Cliente,
    Incidencia,
    Inmueble,
    Mensualidad,
    Proveedor,
    Reforma,
    Usuario,
    Ibi,
    Renta,
    Foto,
    Seguro,
    ObservacionCliente,
    ObservacionInmueble,
    ObservacionProveedor,
    TipoIncidencia,
    Reparacion,
  ],
});

AppDataSource.initialize()
  .then(async () => {
    await seedDatabase(AppDataSource);
    console.log('Seeding completado');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error al ejecutar seed:', err);
    process.exit(1);
  });

export default seedDatabase;
