import { Post } from '../models/Post';

//const postData: { map: (data: Object) => dbPost } = await
export const getAllPosts = (req, res) => {
  Post.findAll().then((postData) => {
    const plainPosts = postData.map((data) =>
      data.get({ plain: true })
    );
    console.log(plainPosts);
    res.render('blog', plainPosts);
  });
};

export const getSinglePost = (req, res) => {
  const id = req.params.id;
  Post.findByPk(id).then((postData) => {;
    console.log(plainPosts);
    res.render('blog', plainPosts);
  });
};
