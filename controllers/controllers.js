const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

//const postData: { map: (data: Object) => dbPost } = await
const getAllPosts = (req, res) => {
  Post.findAll({ include: [{ model: User }] }).then((postData) => {
    const plainPosts = postData.map((data) => data.get({ plain: true }));
    console.log(plainPosts);
    res.render('blog', { plainPosts, loggedIn: req.session.loggedIn });
  });
};

const getSinglePost = (req, res) => {
  const id = req.params.id;
  Post.findOne({
    include: [{ model: User }],
    where: { id: id },
  }).then((postData) => {
    const plainPosts = postData.get({ plain: true });
    Comment.findAll({
      include: [{ model: User, Post }],
      where: { post_id: id },
    }).then((commentData) => {
      const commentsPost = commentData.map((data) => data.get({ plain: true }));
      res.render('post', {
        plainPosts,
        loggedIn: req.session.loggedIn,
        commentsPost,
      });
    });
  });
};

module.exports = { getAllPosts, getSinglePost };
