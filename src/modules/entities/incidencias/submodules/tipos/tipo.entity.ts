import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tipo_incidencia')
export class Tipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, unique: true })
  nombre: string;
}
