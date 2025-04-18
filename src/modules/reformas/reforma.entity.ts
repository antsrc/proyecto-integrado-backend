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

  @ManyToOne(() => Inmueble, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'inmueble_id' })
  inmueble: Inmueble;

  @ManyToOne(() => Proveedor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'proveedor_id' })
  proveedor: Proveedor;

  @Column({ length: 100 })
  descripcion: string;

  @Column('text')
  observacion: string;

  @Column({ type: 'date', name: 'fecha_inicio' })
  fechaInicio: Date;

  @Column({ type: 'date', name: 'fecha_fin', nullable: true })
  fechaFin: Date | null;

  @Column('decimal', { precision: 8, scale: 2 })
  importe: number;

  @Column({ length: 50, unique: true, name: 'cod_factura' })
  codFactura: string;
}
