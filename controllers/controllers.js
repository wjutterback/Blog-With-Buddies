const Post = require('../models/Post');
const User = require('../models/User');

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
    res.render('post', { plainPosts, loggedIn: req.session.loggedIn });
  });
};

module.exports = { getAllPosts, getSinglePost };