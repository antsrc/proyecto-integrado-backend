import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Inmueble } from './inmueble.entity';

@Entity('ibi_inmueble')
export class Ibi {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Inmueble, (inmueble) => inmueble.id, { onDelete: 'CASCADE' })
  inmueble: Inmueble;

  @Column('integer', { name: 'inmueble_id' })
  inmuebleId: number;

  @Column({ type: 'date', name: 'fecha_abono' })
  fechaAbono: Date;

  @Column({ type: 'decimal', precision: 8, scale: 2, name: 'importe' })
  importe: number;
}