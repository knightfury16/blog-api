import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column()
  ownerId: number;
  @ManyToOne(() => User, user => user.blogs)
  @JoinColumn({ name: 'ownerId' })
  owner: User;
}
