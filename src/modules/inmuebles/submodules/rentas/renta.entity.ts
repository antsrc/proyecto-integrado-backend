import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Inmueble } from '../../inmueble.entity';

@Entity('renta_inmueble')
export class Renta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Inmueble, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'inmueble_id' })
  inmueble: Inmueble;

  @Column({ type: 'year' })
  ano: number;

  @Column('decimal', { precision: 8, scale: 2 })
  base: number;

  @Column('decimal', { precision: 8, scale: 2 })
  comunidad: number;

  @Column('decimal', { precision: 4, scale: 2, name: 'iva_porcentaje' })
  ivaPorcentaje: number;

  get total(): number {
    return (
      Number(this.base) * (1 + Number(this.ivaPorcentaje) / 100) +
      Number(this.comunidad)
    );
  }
}
