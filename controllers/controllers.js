const Post = require('../models/Post');

//const postData: { map: (data: Object) => dbPost } = await
const getAllPosts = (req, res) => {
  Post.findAll().then((postData) => {
    const plainPosts = postData.map((data) => data.get({ plain: true }));
    console.log(plainPosts);
    res.render('blog', { plainPosts, loggedIn: req.session.loggedIn });
  });
};

const getSinglePost = (req, res) => {
  const id = req.params.id;
  Post.findByPk(id).then((postData) => {
    const plainPosts = postData.get({ plain: true });
    res.render('post', { plainPosts, loggedIn: req.session.loggedIn });
  });
};

module.exports = { getAllPosts, getSinglePost };
