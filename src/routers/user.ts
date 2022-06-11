import { validateOrReject } from 'class-validator';
import express, { Request, Response } from 'express';
import { Token } from '../entity/Token';
import { User } from '../entity/User';
import auth from '../middleware/auth';

const router = express.Router();

/**
 * * Register user
 * - POST(/users)
 */
router.post('/users', async (req: Request, res: Response) => {
  try {
    const user = User.create(req.body);
    await validateOrReject(user, { skipMissingProperties: true });
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error: any) {
    console.log(error);
    res.status(400).send(error);
  }
});

/**
 * * Login user
 * - POST(/users/login)
 */
router.post('/users/login', async (req: Request, res: Response) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error: any) {
    console.log(error);
    res.status(400).send(error);
  }
});

/**
 * * Logout user current device
 * ! Authenticated
 * - POST(/users/logout)
 */
router.post('/users/logout', auth, async (req: Request, res: Response) => {
  try {
    await Token.delete({ ownerId: req.user.id, token: req.token });
    res.send('Logged out');
  } catch (error) {
    res.status(500).send();
  }
});

/**
 * * Logout user from all device
 * ! Authenticated
 * - POST(/users/logoutAll)
 */
router.post('/users/logoutAll', auth, async (req: Request, res: Response) => {
  try {
    await Token.delete({ ownerId: req.user.id });
    res.status(200).send('Logged out from all the device');
  } catch (error) {
    res.status(500).send();
  }
});

/**
 * * Get user profile
 * ! Authenticated
 * - GET(/users/me)
 */
router.get('/users/me', auth, (req: Request, res: Response) => {
  res.send(req.user);
});

/**
 * *Edit user profile
 * !Authenticated
 * -PATCH(/users/me)
 */
router.patch('/users/me', auth, async (req: any, res: Response) => {
  const updates: string[] = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValid = updates.every(item => allowedUpdates.includes(item));

  if (!isValid) return res.status(400).send({ error: 'Invalid Updates!' });

  try {
    updates.forEach(update => {
      req.user[update] = req.body[update];
    });
    await validateOrReject(req.user, { skipMissingProperties: true });
    await req.user.save();
    res.status(200).send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
