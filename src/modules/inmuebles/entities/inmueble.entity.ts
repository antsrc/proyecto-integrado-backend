import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Renta } from './renta.entity';

@Entity('inmueble')
export class Inmueble {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar', length: 50 })
  codigo: string;

  @Column({ type: 'varchar', length: 255 })
  direccion: string;

  @Column({ type: 'char', length: 5 })
  cod_postal: string;

  @Column({ type: 'varchar', length: 100 })
  municipio: string;

  @Column({ type: 'varchar', length: 100 })
  provincia: string;

  @Column({ type: 'varchar', length: 50 })
  tipo: string;

  @Column({ type: 'decimal', precision: 7, scale: 2 }) 
  metros_cuadrados: number;

  @Column({ type: 'varchar', length: 50 })
  ref_catastral: string;

}
