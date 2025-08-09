import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

/**
 * 用户实体类
 *
 * 用于存储系统中所有用户信息，包括顾客和员工
 * 基本信息存储在此表中，员工的详细信息存储在staff表中
 */
@Entity('user')
export class User {
  /**
   * 用户ID，主键
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 用户手机号，唯一标识
   * 用于登录和身份验证
   */
  @Column({ length: 20, unique: true })
  phone: string;

  /**
   * 用户邮箱
   * 用于登录和身份验证
   */
  @Column({ length: 50, unique: true })
  email: string;

  /**
   * 用户姓名
   */
  @Column({ length: 100, nullable: true })
  name: string;

  /**
   * 用户原始密码
   * 不存储到数据库，仅用于注册和修改密码时的临时存储
   */
  @Column({ select: false, insert: false, update: false, nullable: true })
  password: string;

  /**
   * 用户密码哈希值
   * select: false 表示默认查询时不返回此字段
   */
  @Column({ select: false })
  password_hash: string;

  /**
   * 用户昵称
   */
  @Column({ length: 50, nullable: true })
  nickname: string;

  /**
   * 用户头像URL
   */
  @Column({ nullable: true })
  avatar: string;

  /**
   * 用户类型
   * customer: 顾客
   * staff: 员工
   */
  @Column({ type: 'enum', enum: ['customer', 'staff'], default: 'customer' })
  user_type: 'customer' | 'staff';

  /**
   * 用户状态
   * 1: 正常
   * 0: 禁用
   */
  @Column({ type: 'tinyint', default: 1 })
  status: number;

  /**
   * 创建时间
   */
  @CreateDateColumn()
  created_at: Date;

  /**
   * 更新时间
   */
  @UpdateDateColumn()
  updated_at: Date;

  /**
   * 在插入或更新前处理密码
   * 如果提供了password，则生成password_hash
   */
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      // 使用bcrypt加密密码，盐值为10
      this.password_hash = await bcrypt.hash(this.password, 10);
    }
  }
}
