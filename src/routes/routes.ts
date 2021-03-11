import * as express from 'express';
import * as path from 'path';
const router = express.Router();
import { getAllPosts } from '../controllers/controllers';
import { Comment } from '../models/Comment';

//TODO: try to wrap all routes/dry up route code stretch goal
//these types are essentially the Class Models (could bypass type usage with Model[], etc.) more for edification
type dbUser = Array<{
  id: number;
  name: string;
  email: string;
  password: string;
}>;

type dbComment = Array<{
  id: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  postId: number;
}>;

router.get('/', async (req, res) => {
  //only here to create table
  const commentData: {
    map: (data: Object) => dbComment;
  } = await Comment.findAll();
  getAllPosts;
});

router.get('/sign-in', async (req, res) => {
  try {
    res.render('signin');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/sign-up', async (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/sign-up', async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
