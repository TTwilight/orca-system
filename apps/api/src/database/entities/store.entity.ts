import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  store_name: string;

  @Column()
  address: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ nullable: true })
  business_hours: string;

  @Column({ type: 'tinyint', default: 1 })
  status: number;
}
