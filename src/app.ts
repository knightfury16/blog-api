import express, { Request, Response } from 'express';
import userRouter from './routers/user';
import './db/sqlConnection';

const app = express();
app.use(express.json());
app.use(userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Home Screen');
});

export = app;
