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

  @ManyToOne(() => Cliente, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @ManyToOne(() => Inmueble, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'inmueble_id' })
  inmueble: Inmueble;

  @Column({ type: 'date', name: 'fecha_alta' })
  fechaAlta: Date;

  @Column({ type: 'date', name: 'fecha_baja', nullable: true })
  fechaBaja: Date | null;

  @Column('decimal', { precision: 8, scale: 2 })
  fianza: number;

  @Column({ length: 50, unique: true, name: 'cod_contrato' })
  codContrato: string;
}
