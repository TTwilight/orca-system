import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Staff } from './staff.entity';
import { Role } from './role.entity';

@Entity('staff_roles')
export class StaffRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  staff_id: number;

  @ManyToOne(() => Staff)
  @JoinColumn({ name: 'staff_id' })
  staff: Staff;

  @Column()
  role_id: number;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
