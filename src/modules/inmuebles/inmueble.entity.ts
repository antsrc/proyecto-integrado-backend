import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('inmueble')
export class Inmueble {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, unique: true })
  codigo: string;

  @Column({ length: 100 })
  direccion: string;

  @Column({ name: 'cod_postal', length: 5 })
  codPostal: string;

  @Column({ length: 30 })
  municipio: string;

  @Column({ length: 30 })
  provincia: string;

  @Column({ length: 30 })
  tipo: string;

  @Column('decimal', {
    name: 'metros_cuadrados',
    precision: 8,
    scale: 2,
  })
  metrosCuadrados: number;

  @Column({ name: 'ref_catastral', length: 30, unique: true })
  refCatastral: string;
}