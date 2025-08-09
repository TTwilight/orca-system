import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 课程实体类
 *
 * 用于存储按摩店提供的各种服务课程信息
 * 包括课程名称、时长、价格等基本信息
 */
@Entity('courses')
export class Course {
  /**
   * 课程ID，主键
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 课程名称
   * 例如：全身按摩、足部按摩、精油SPA等
   */
  @Column({ length: 100 })
  course_name: string;

  /**
   * 课程时长（分钟）
   * 用于计算预约时间段和排班安排
   */
  @Column()
  duration_minutes: number;

  /**
   * 课程价格
   * precision: 10 表示总位数
   * scale: 2 表示小数位数
   */
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  /**
   * 课程描述
   * 详细介绍课程内容、适用人群、效果等
   */
  @Column({ type: 'text', nullable: true })
  description: string;

  /**
   * 课程状态
   * 1: 上架中
   * 0: 已下架
   */
  @Column({ type: 'tinyint', default: 1 })
  status: number;
}
