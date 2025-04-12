import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Inmueble } from './inmueble.entity';

@Entity('foto_inmueble')
export class Foto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Inmueble, { onDelete: 'CASCADE' })
  inmueble: Inmueble;

  @Column('integer', { name: 'inmueble_id' })
  inmuebleId: number;

  @Column({ type: 'char', length: 32 })
  imagen: string;
}