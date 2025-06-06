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
import { Reparacion } from '../reparaciones/reparacion.entity';

@Entity('incidencia')
export class Incidencia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, unique: true })
  codigo: string;

  @ManyToOne(() => Alquiler)
  @JoinColumn({ name: 'alquiler_id' })
  alquiler: Alquiler;

  @ManyToOne(() => Proveedor, { nullable: true })
  @JoinColumn({ name: 'proveedor_avisado_id' })
  proveedorAvisado: Proveedor | null;

  @Column({ length: 30 })
  tipo: string;

  @OneToOne(() => Reparacion, (reparacion) => reparacion.incidencia)
  reparacion: Reparacion | null;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'date', name: 'fecha_registro' })
  fechaRegistro: Date;
}
