import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Inmueble } from './inmueble.entity';

@Entity('renta_inmueble')
export class Renta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Inmueble, (inmueble) => inmueble.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'inmueble_id' })
  inmueble: Inmueble;

  @Column('integer', { name: 'inmueble_id' })
  inmuebleId: number;

  @Column('year')
  ano: number;

  @Column('decimal', { precision: 6, scale: 2 })
  base: number;

  @Column('decimal', { precision: 6, scale: 2 })
  comunidad: number;

  @Column('decimal', { precision: 4, scale: 2 })
  iva: number;

  @Column({
    type: 'decimal',
    precision: 9,
    scale: 2,
    generatedType: 'STORED',
    asExpression: 'base + comunidad + iva',
    insert: false,
    update: false,
  })
  total: number;
}