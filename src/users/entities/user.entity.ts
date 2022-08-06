import { Exclude, Transform } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  version: number;

  @Column({ type: 'bigint' /*, nullable: true, default: null */ })
  @Transform(({ value }) => parseInt(value))
  createdAt: number;

  @Column({ type: 'bigint' /*, nullable: true, default: null */ })
  @Transform(({ value }) => parseInt(value))
  updatedAt: number;
}
