import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Incidencia } from '../incidencias/incidencia.entity';
import { Proveedor } from 'src/modules/proveedores/proveedor.entity';

@Entity('reparacion')
export class Reparacion {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Incidencia)
  @JoinColumn({ name: 'incidencia_id' })
  incidencia: Incidencia;

  @ManyToOne(() => Proveedor)
  @JoinColumn({ name: 'proveedor_id' })
  proveedor: Proveedor;

  @Column({ type: 'date', name: 'fecha_fin' })
  fechaFin: Date;

  @Column('decimal', { precision: 8, scale: 2 })
  importe: number;

  @Column('text')
  descripcion: string;
}
