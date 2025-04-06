import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Inmueble } from './inmueble.entity';

@Entity('seguro_inmueble')
export class Seguro {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Inmueble, (inmueble) => inmueble.id, { onDelete: 'CASCADE' })
  inmueble: Inmueble;

  @Column('integer', { name: 'inmueble_id'})
  inmuebleId: number;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'date' })
  fecha_alta: Date;

  @Column({ type: 'date' })
  fecha_vencimiento: Date;

  @Column({ type: 'varchar' })
  tfno_asistencia: string;

  @Column({ type: 'varchar' })
  num_poliza: string;
}