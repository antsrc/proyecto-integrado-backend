import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Inmueble } from '../../inmueble.entity';

@Entity('foto_inmueble')
export class Foto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Inmueble)
  @JoinColumn({ name: 'inmueble_id' })
  inmueble: Inmueble;

  @Column({ type: 'char', length: 32, unique: true })
  imagen: string;
}