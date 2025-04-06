import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Inmueble } from './inmueble.entity';

@Entity('foto_inmueble')
export class Foto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Inmueble, (inmueble) => inmueble, { onDelete: 'CASCADE' })
  inmueble: Inmueble;

  @Column({ type: 'varchar' })
  imagen: string;
}