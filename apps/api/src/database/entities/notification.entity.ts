import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: ['sms', 'wechat', 'app'],
    default: 'app',
  })
  type: 'sms' | 'wechat' | 'app';

  @Column({ nullable: true })
  template_id: string;

  @Column({ type: 'json', nullable: true })
  params: Record<string, any>;

  @Column({
    type: 'enum',
    enum: ['pending', 'sent', 'failed'],
    default: 'pending',
  })
  status: 'pending' | 'sent' | 'failed';

  @CreateDateColumn()
  created_at: Date;
}
