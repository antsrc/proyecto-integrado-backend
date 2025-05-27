import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, unique: true })
  codigo: string;

  @Column({ type: 'char', length: 9, unique: true })
  dni: string;

  @Column({ length: 100, name: 'nombre_completo' })
  nombreCompleto: string;

  @Column({ length: 30 })
  telefono: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 30, name: 'num_cuenta' })
  numCuenta: string;

  @Column({ length: 100, name: 'referido_por', nullable: true })
  referidoPor: string;

  @Column('decimal', { precision: 8, scale: 2, default: 0 })
  deuda: number;
}