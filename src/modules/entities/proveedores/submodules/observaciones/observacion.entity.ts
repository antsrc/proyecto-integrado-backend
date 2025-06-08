import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Proveedor } from 'src/modules/entities/proveedores/proveedor.entity';
import { IObservacion } from 'src/shared/interfaces/observacion.interface';

@Entity('observacion_proveedor')
export class Observacion implements IObservacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Proveedor)
  @JoinColumn({ name: 'proveedor_id' })
  proveedor: Proveedor;

  @Column({ type: 'text' })
  comentario: string;

  @Column({ type: 'date' })
  fecha: Date;
}