import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Inmueble } from 'src/modules/inmuebles/inmueble.entity';
import { IObservacion } from 'src/shared/interfaces/observacion.interface';

@Entity('observacion_inmueble')
export class Observacion implements IObservacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Inmueble)
  @JoinColumn({ name: 'inmueble_id' })
  inmueble: Inmueble;

  @Column({ type: 'text' })
  comentario: string;

  @Column({ type: 'date' })
  fecha: Date;
}
