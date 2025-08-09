import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Technician } from './technician.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  technician_id: number;

  @ManyToOne(() => Technician)
  @JoinColumn({ name: 'technician_id' })
  technician: Technician;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  start_time: Date;

  @Column({ type: 'time' })
  end_time: Date;

  @Column({
    type: 'enum',
    enum: ['available', 'off', 'leave'],
    default: 'available',
  })
  status: 'available' | 'off' | 'leave';
}
