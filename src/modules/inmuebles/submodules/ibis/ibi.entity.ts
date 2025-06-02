import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Inmueble } from '../../inmueble.entity';

@Entity('ibi_inmueble')
export class Ibi {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Inmueble)
  @JoinColumn({ name: 'inmueble_id' })
  inmueble: Inmueble;
  
  @Column({ type: 'date', name: 'fecha_abono' })
  fechaAbono: Date;

  @Column('decimal', { precision: 8, scale: 2 })
  importe: number;
}