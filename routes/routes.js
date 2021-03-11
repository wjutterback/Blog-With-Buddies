import * as express from 'express';
import * as path from 'path';
const router = express.Router();
import { getAllPosts, getSinglePost } from '../controllers/controllers';

// const commentData = await Comment.findAll();

router.get('/', (req, res) => {
  getAllPosts(req, res);
});

router.get('/post/:id'),
  (req, res) => {
    getSinglePost(req, res);
  };

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
