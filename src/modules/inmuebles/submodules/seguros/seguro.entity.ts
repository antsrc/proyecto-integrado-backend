import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Inmueble } from '../../inmueble.entity';

@Entity('seguro_inmueble')
export class Seguro {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Inmueble, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'inmueble_id' })
  inmueble: Inmueble;

  @Column({ length: 50 })
  nombre: string;

  @Column({ type: 'date', name: 'fecha_alta' })
  fechaAlta: Date;

  @Column({ type: 'date', name: 'fecha_vencimiento' })
  fechaVencimiento: Date;

  @Column({ length: 30, name: 'tfno_asistencia' })
  tfnoAsistencia: string;

  @Column({ length: 30, unique: true, name: 'num_poliza' })
  numPoliza: string;
}