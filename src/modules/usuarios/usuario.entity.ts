import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum RolUsuario {
  ADMINISTRATIVO = 'administrativo',
  SUPERVISOR = 'supervisor',
}

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RolUsuario,
    default: RolUsuario.ADMINISTRATIVO,
  })
  rol: RolUsuario;
  

  @Column({ length: 30, unique: true })
  nombre: string;

  @Column({ length: 100 })
  contrasena: string;
}
