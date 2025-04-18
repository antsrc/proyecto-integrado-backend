import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('inmueble')
export class Inmueble {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, unique: true })
  codigo: string;

  @Column({ length: 100 })
  direccion: string;

  @Column({ length: 5 })
  cod_postal: string;

  @Column({ length: 30 })
  municipio: string;

  @Column({ length: 30 })
  provincia: string;

  @Column({ length: 30 })
  tipo: string;

  @Column('decimal', { precision: 8, scale: 2 })
  metros_cuadrados: number;

  @Column({ length: 30, unique: true })
  ref_catastral: string;
}