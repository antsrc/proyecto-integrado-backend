import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Inmueble } from './inmueble.entity';

@Entity('seguro_inmueble')
export class Seguro {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Inmueble, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'inmueble_id' })
  inmueble: Inmueble;

  @Column('integer', { name: 'inmueble_id' })
  inmuebleId: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'date' })
  fecha_alta: Date;

  @Column({ type: 'date' })
  fecha_vencimiento: Date;

  @Column({ type: 'varchar', length: 15 })
  tfno_asistencia: string;

  @Column({ type: 'varchar', length: 20 })
  num_poliza: string;
}