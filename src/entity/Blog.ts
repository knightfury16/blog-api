import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Blog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  ownerId: number;
  @ManyToOne(() => User, user => user.blogs)
  @JoinColumn({ name: 'ownerId' })
  owner: User;
}
