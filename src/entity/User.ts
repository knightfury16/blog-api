import bcrypt from 'bcrypt';
import { IsEmail, IsNotEmpty, IsPositive, MinLength } from 'class-validator';
import * as jwt from 'jsonwebtoken';
import { stringify } from 'querystring';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
  BeforeInsert
} from 'typeorm';
import { IUser } from '../types/IUser';
import { Blog } from './Blog';

@Entity()
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true
  })
  @IsNotEmpty()
  name: string;

  @Column({
    type: 'text',
    nullable: true
  })
  @IsNotEmpty()
  @MinLength(7)
  password: string;

  @Column({
    type: 'varchar',
    length: 200,
    unique: true,
    nullable: true
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({
    type: 'int',
    default: 1
  })
  @IsPositive()
  age: number;

  @OneToMany(() => Blog, blog => blog.owner)
  blogs: Blog[];

  @BeforeInsert()
  async encryptPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  toJSON() {
    return { ...this, password: undefined };
  }

  async generateAuthToken() {
    const user = this;
    const payload: jwt.JwtPayload = {
      _id: user.id
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET as jwt.Secret);
    return token;
  }

  static async findByCredentials(email: string, password: string) {
    const user = await this.findOneBy({ email });
    if (!user) {
      throw new Error('Unable to login!');
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Unable to login!');
    }
    return user;
  }
}
