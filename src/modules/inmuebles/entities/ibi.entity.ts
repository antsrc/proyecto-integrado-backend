import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Inmueble } from './inmueble.entity';

@Entity('ibi_inmueble')
export class Ibi {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Inmueble, (inmueble) => inmueble.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'inmueble_id' })
  inmueble: Inmueble;

  @Column('integer', { name: 'inmueble_id'})
  inmuebleId: number;

  @Column({ type: 'date', name: 'fecha_abono' })
  fechaAbono: Date;

  @Column({ type: 'decimal', precision: 9, scale: 2, name: 'valor_catastral' })
  importe: number;

}