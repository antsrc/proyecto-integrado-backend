import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from 'src/modules/clientes/cliente.entity';
import { IObservacion } from 'src/shared/interfaces/observacion.interface';

@Entity('observacion_cliente')
export class Observacion implements IObservacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @Column({ type: 'text' })
  comentario: string;

  @Column({ type: 'date' })
  fecha: Date;
}