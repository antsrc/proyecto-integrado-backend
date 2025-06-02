import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Inmueble } from '../inmuebles/inmueble.entity';
import { Proveedor } from '../proveedores/proveedor.entity';

@Entity('reforma')
export class Reforma {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, unique: true, name: 'codigo' })
  codigo: string;

  @ManyToOne(() => Inmueble)
  @JoinColumn({ name: 'inmueble_id' })
  inmueble: Inmueble;

  @ManyToOne(() => Proveedor)
  @JoinColumn({ name: 'proveedor_id' })
  proveedor: Proveedor;

  @Column({ length: 30 })
  tipo: string;

  @Column('text', { nullable: true })
  descripcion: string | null;

  @Column({ type: 'date', name: 'fecha_inicio' })
  fechaInicio: Date;

  @Column({ type: 'date', name: 'fecha_fin', nullable: true })
  fechaFin: Date | null;

  @Column('decimal', { precision: 8, scale: 2, nullable: true })
  importe: number | null;
}
