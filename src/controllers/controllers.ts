import { Post } from '../models/Post';

type dbPost = Array<{
  id: number;
  postTitle: string;
  postText: string;
  createdAt: Date;
  updatedAt: Date;
}>;

export const getAllPosts = (req, res) => {
  Post.findAll(),
    (err, posts) => {
      if (err) {
        res.send(err);
      }
      const plainPosts: dbPost = posts.map((data) => data.get({ plain: true }));
      res.render('blog', plainPosts);
    };
};