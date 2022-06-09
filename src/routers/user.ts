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
    res.send(400);
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
    res.status(400).send();
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
    res.send('Logout');
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
    res.status(200).send('Logout from the device');
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

export default router;
