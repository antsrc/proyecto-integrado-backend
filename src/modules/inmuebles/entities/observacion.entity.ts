import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Inmueble } from './inmueble.entity';

@Entity('observacion_inmueble')
export class Observacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Inmueble, { onDelete: 'CASCADE', eager: false, nullable: false })
  @JoinColumn({ name: 'inmueble_id' })
  inmueble: Inmueble;

  @Column({ type: 'text' })
  comentario: string;

  @Column({ type: 'date' })
  fecha: Date;
}