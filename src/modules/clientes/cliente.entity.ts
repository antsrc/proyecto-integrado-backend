import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 9, unique: true })
  dni: string;

  @Column({ length: 100 })
  nombre_completo: string;

  @Column({ length: 30 })
  telefono: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 30 })
  num_cuent: string;

  @Column({ length: 100 })
  referido_por: string;

  @Column('decimal', { precision: 8, scale: 2, default: 0 })
  deuda: number;  
}