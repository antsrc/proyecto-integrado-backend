import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum RolUsuario {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RolUsuario,
    default: RolUsuario.USER,
  })
  rol: RolUsuario;
  
  @Column({ length: 30, unique: true })
  nombre: string;

  @Column({ length: 60 })
  contrasena: string;

  @Column({ type: 'date', name: 'fecha_creacion', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;

  @Column({ name: 'usuario_creacion', length: 30, default: 'sistema' })
  usuarioCreacion: string;

  @Column({ type: 'date', name: 'ultimo_inicio', nullable: true, default: null })
  ultimoInicio: Date | null;
}