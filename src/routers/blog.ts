import { validateOrReject } from 'class-validator';
import express, { Request, Response } from 'express';
import { Blog } from '../entity/Blog';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/blogs/create', auth, async (req: Request, res: Response) => {
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

router.get('/blogs', async (req: Request, res: Response) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
  const skip = req.query.skip ? parseInt(req.query.skip as string) : undefined;

  try {
    const blogs = await Blog.createQueryBuilder('blog')
      .orderBy('blog.id', 'DESC')
      .skip(skip)
      .take(limit)
      .getMany();
    res.send(blogs);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
