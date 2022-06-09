import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  ownerId: number;
  @ManyToOne(() => User, user => user.tokens)
  @JoinColumn({ name: 'ownerId' })
  owner: User;
}
