import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  permission_code: string;

  @Column({ length: 100 })
  permission_name: string;

  @Column({ nullable: true })
  description: string;
}
