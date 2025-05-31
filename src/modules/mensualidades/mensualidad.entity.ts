import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Alquiler } from '../alquileres/alquiler.entity';

@Entity('mensualidad')
export class Mensualidad {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Alquiler, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'alquiler_id' })
  alquiler: Alquiler;

  @Column({ type: 'date', name: 'fecha_inicio' })
  fechaInicio: Date;

  @Column({ type: 'date', name: 'fecha_fin' })
  fechaFin: Date;

  @Column('decimal', { precision: 8, scale: 2 })
  importe: number;

  @Column({ type: 'date', name: 'fecha_emision' })
  fechaEmision: Date;

  @Column({ type: 'date', name: 'fecha_pago', nullable: true })
  fechaPago: Date | null;

  @Column({ type: 'varchar', length: 30, nullable: true, name: 'forma_pago' })
  formaPago: string | null;
}
