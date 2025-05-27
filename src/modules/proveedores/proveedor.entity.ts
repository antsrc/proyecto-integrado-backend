import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('proveedor')
export class Proveedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, unique: true })
  codigo: string;

  @Column({ length: 30, unique: true })
  cif: string;

  @Column({ length: 50 })
  nombre: string;

  @Column({ length: 30 })
  tipo: string;

  @Column({ length: 100 })
  direccion: string;

  @Column({ length: 30 })
  telefono: string;

  @Column({ length: 100 })
  descripcion: string;
}