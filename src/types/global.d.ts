import { User } from '../entity/User';

declare global {
  namespace Express {
    interface Request {
      token: string;
      user: User;
    }
  }
}

export {};
