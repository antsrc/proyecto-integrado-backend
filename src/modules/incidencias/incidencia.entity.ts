import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Alquiler } from '../alquileres/alquiler.entity';
import { Proveedor } from '../proveedores/proveedor.entity';
import { Reparacion } from './submodules/reparaciones/reparacion.entity';

@Entity('incidencia')
export class Incidencia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, unique: true })
  codigo: string;

  @ManyToOne(() => Alquiler, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'alquiler_id' })
  alquiler: Alquiler;

  @ManyToOne(() => Proveedor, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'proveedor_avisado_id' })
  proveedorAvisado: Proveedor | null;

  @Column({ length: 30 })
  tipo: string;

  @OneToOne(() => Reparacion, (reparacion) => reparacion.incidencia)
  reparacion: Reparacion | null;

  @Column({ length: 100 })
  descripcion: string;

  @Column({ type: 'date', name: 'fecha_registro' })
  fechaRegistro: Date;
}
