import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Inmueble } from './inmueble.entity';

@Entity('observacion_inmueble')
export class Observacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Inmueble, (inmueble) => inmueble, { onDelete: 'CASCADE' })
  inmueble: Inmueble;

  @Column({ type: 'varchar' })
  comentario: string;

  @Column({ type: 'timestamp' })
  fecha: Date;
}