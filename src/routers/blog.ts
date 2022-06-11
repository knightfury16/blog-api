import { validateOrReject } from 'class-validator';
import express, { Request, Response } from 'express';
import { Blog } from '../entity/Blog';
import auth from '../middleware/auth';

const router = express.Router();

/**
 * *Create new blog for login user
 * !Authenticated
 * -POST(/blogs/create)
 */
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

/**
 * *Get most recent 10 blogs my deafult
 * -GET(/blogs) get most recent 10 blogs
 * -GET(/blogs?limit=2&skip=2) get only recent two blogs and skip 2 blogs
 */
router.get('/blogs', async (req: Request, res: Response) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
  const skip = req.query.skip ? parseInt(req.query.skip as string) : undefined;

  try {
    const blogs = await Blog.createQueryBuilder('blog')
      .orderBy('blog.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getMany();
    res.send(blogs);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * *Get blog by id
 * -GET(/blogs/:id)
 */
router.get('/blogs/:id', async (req: Request, res: Response) => {
  const _id = parseInt(req.params.id);
  try {
    const blog = await Blog.findOneBy({ id: _id });
    if (!blog) return res.status(404).send();
    res.send(blog);
  } catch (error) {
    res.status(500).send();
  }
});

/**
 * *Delete blog
 * !Authenticated
 * -DELETE(/blogs/:id)
 */
router.delete('/blogs/:id', auth, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const blog = await Blog.findOneBy({ id });
    if (!blog) return res.status(404).send();
    if (blog.ownerId != req.user.id) return res.status(401).send();
    await Blog.delete({ id });
    res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
});

export default router;
