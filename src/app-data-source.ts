import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Blog } from './entity/Blog';
import { Token } from './entity/Token';
import { User } from './entity/User';

export const myDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT!,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, Blog, Token],
  logging: false,
  synchronize: true
});
