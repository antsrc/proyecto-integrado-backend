import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';
import { Inmueble } from '../inmuebles/inmueble.entity';

@Entity('alquiler_inmueble_cliente')
export class Alquiler {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, unique: true })
  codigo: string;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @ManyToOne(() => Inmueble)
  @JoinColumn({ name: 'inmueble_id' })
  inmueble: Inmueble;

  @Column({ type: 'date', name: 'fecha_alta' })
  fechaAlta: Date;

  @Column({ type: 'date', name: 'fecha_baja', nullable: true })
  fechaBaja: Date | null;

  @Column('decimal', { precision: 6, scale: 2, nullable: true })
  fianza: number | null;
}
