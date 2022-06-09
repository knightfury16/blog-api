import { validateOrReject } from 'class-validator';
import express, { Request, Response } from 'express';
import { Blog } from '../entity/Blog';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/blog/create', auth, async (req: Request, res: Response) => {
  const blog = Blog.create({
    ...req.body,
    ownerId: req.user.id
  });
  try {
    await validateOrReject(blog);
    await blog.save();
    res.status(201).send(blog);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
