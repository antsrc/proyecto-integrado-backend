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
import { Tipo } from './submodules/tipos/tipo.entity';
import { Reparacion } from './submodules/reparaciones/reparacion.entity';

@Entity('incidencia')
export class Incidencia {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Alquiler, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'alquiler_id' })
  alquiler: Alquiler;

  @ManyToOne(() => Proveedor, { nullable: true })
  @JoinColumn({ name: 'proveedor_avisado_id' })
  proveedorAvisado: Proveedor | null;

  @ManyToOne(() => Tipo)
  @JoinColumn({ name: 'tipo_id' })
  tipo: Tipo;

  @OneToOne(() => Reparacion, (reparacion) => reparacion.incidencia)
  reparacion: Reparacion | null;

  @Column({ length: 100 })
  descripcion: string;

  @Column({ type: 'date', name: 'fecha_registro' })
  fechaRegistro: Date;
}
