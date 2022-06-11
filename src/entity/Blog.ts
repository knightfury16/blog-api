import { IsNotEmpty } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from './User';

@Entity()
export class Blog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 500
  })
  @IsNotEmpty()
  title: string;

  @Column({
    type: 'text',
    nullable: true
  })
  @IsNotEmpty()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  ownerId: number;
  @ManyToOne(() => User, user => user.blogs)
  @JoinColumn({ name: 'ownerId' })
  owner: User;
}
