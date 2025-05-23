import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Incidencia } from '../../incidencia.entity';
import { Proveedor } from 'src/modules/proveedores/proveedor.entity';

@Entity('reparacion')
export class Reparacion {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Incidencia, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'incidencia_id' })
  incidencia: Incidencia;

  @ManyToOne(() => Proveedor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'proveedor_id' })
  proveedor: Proveedor;

  @Column({ length: 100 })
  descripcion: string;

  @Column('text')
  observacion: string;

  @Column({ type: 'date', name: 'fecha_fin' })
  fechaFin: Date;

  @Column('decimal', { precision: 8, scale: 2 })
  importe: number;

  @Column({ length: 50, unique: true, name: 'cod_factura' })
  codFactura: string;
}
