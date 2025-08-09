import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Staff } from './staff.entity';

@Entity('technicians')
export class Technician {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  staff_id: number;

  @ManyToOne(() => Staff)
  @JoinColumn({ name: 'staff_id' })
  staff: Staff;

  @Column({ nullable: true })
  speciality: string;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 1,
    default: 5.0,
    nullable: true,
  })
  rating: number;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'tinyint', default: 1 })
  status: number;
}
