import bcrypt from 'bcrypt';
import { IsEmail, IsNotEmpty, IsPositive, MinLength } from 'class-validator';
import * as jwt from 'jsonwebtoken';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Blog } from './Blog';
import { Token } from './Token';

@Entity()
export class User extends BaseEntity {
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
    nullable: true,
    select: false
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Blog, blog => blog.owner)
  blogs: Blog[];

  @OneToMany(() => Token, token => token.owner)
  tokens: Token[];

  @BeforeInsert()
  @BeforeUpdate()
  async encryptPassword() {
    // console.log(this);
    if (this.password) this.password = await bcrypt.hash(this.password, 8);
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
    await Token.create({ token, ownerId: user.id }).save();
    return token;
  }

  static async findByCredentials(email: string, password: string) {
    // const user = await this.findOneBy({ email });
    const user = await this.createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email= :email', { email })
      .getOne();

    if (!user) {
      throw new Error('Unable to login!');
    }
    // console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Unable to login!');
    }
    return user;
  }
}
