import * as express from 'express';
import * as path from 'path';
const router = express.Router();
import { User } from '../models/User';
import { Post } from '../models/Post';
import { Comment } from '../models/Comment';

//TODO: try to wrap all routes/dry up route code stretch goal
//TODO: Use controller to pass in arguments/import functions
//these generics are essentially the Class Models (could bypass generics with Model[], etc.) more for edification
type dbUser = Array<{
  id: number;
  name: string;
  email: string;
  password: string;
}>;

type dbPost = Array<{
  id: number;
  postTitle: string;
  postText: string;
  createdAt: Date;
  updatedAt: Date;
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
  try {
    const commentData: { map: (data) => dbComment } = await Comment.findAll();

    const postData: { map: (data) => dbPost } = await Post.findAll();
    const plainPosts: dbPost = postData.map((data) =>
      data.get({ plain: true })
    );
    console.log(plainPosts);

    const userData: { map: (data) => dbUser } = await User.findAll();
    const plainUsers: dbUser = userData.map((data) =>
      data.get({ plain: true })
    );
    console.log(plainUsers);

    res.render('blog', plainUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/join', async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
