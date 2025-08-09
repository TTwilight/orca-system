import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Technician } from './technician.entity';
import { Course } from './course.entity';

@Entity('technician_courses')
export class TechnicianCourse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  technician_id: number;

  @ManyToOne(() => Technician)
  @JoinColumn({ name: 'technician_id' })
  technician: Technician;

  @Column()
  course_id: number;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course;
}
