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

  @Column({ type: 'tinyint' })
  mes: number;

  @Column({ type: 'year' })
  ano: number;

  @Column('decimal', { precision: 8, scale: 2 })
  importe: number;

  @Column({ type: 'varchar', length: 30, nullable: true, name: 'forma_pago' })
  formaPago: string | null;

  @Column({ type: 'date', name: 'fecha_emision' })
  fechaEmision: Date;

  @Column({ type: 'date', name: 'fecha_pago', nullable: true })
  fechaPago: Date | null;

  @Column({ length: 50, unique: true, name: 'cod_factura' })
  codFactura: string;
}
