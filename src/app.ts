import { validateOrReject } from 'class-validator';
import express, { Request, Response } from 'express';
import './db/sqlConnection';
import { Token } from './entity/Token';
import { User } from './entity/User';
import auth from './middleware/auth';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Home Screen');
});

app.post('/users', async (req: Request, res: Response) => {
  try {
    const user = User.create(req.body);
    await validateOrReject(user, { skipMissingProperties: true });
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error: any) {
    console.log(error);
    res.send(400);
  }
});

app.post('/users/login', async (req: Request, res: Response) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error: any) {
    console.log(error);
    res.status(400).send();
  }
});

app.post('/users/logout', auth, async (req: Request, res: Response) => {
  try {
    await Token.delete({ ownerId: req.user.id, token: req.token });
    res.send('Logout');
  } catch (error) {
    res.status(500).send();
  }
});

app.post('/users/logoutAll', auth, async (req: Request, res: Response) => {
  try {
    await Token.delete({ ownerId: req.user.id });
    res.status(200).send('Logout from the device');
  } catch (error) {
    res.status(500).send();
  }
});

app.get('/users/me', auth, (req: Request, res: Response) => {
  res.send(req.user);
});

export = app;
