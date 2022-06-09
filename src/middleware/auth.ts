import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from '../entity/User';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')!.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as jwt.JwtPayload;

    const user = await User.findOneBy({
      id: decoded._id
    });

    if (!user) throw new Error();

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send({ Error: 'Please authenticate!' });
  }
};

export = auth;
