const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

//Get all Posts
const getAllPosts = (req, res) => {
  Post.findAll({
    include: [{ model: User }],
    order: [['updatedAt', 'DESC']],
  }).then((postData) => {
    const plainPosts = postData.map((data) => data.get({ plain: true }));
    res.render('blog', { plainPosts, loggedIn: req.session.loggedIn });
  });
};

//Get a single Post by ID
const getSinglePost = (req, res) => {
  if (req.session.loggedIn) {
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
        const commentsPost = commentData.map((data) =>
          data.get({ plain: true })
        );
        res.render('post', {
          plainPosts,
          loggedIn: req.session.loggedIn,
          commentsPost,
        });
      });
    });
  } else {
    res.redirect('/sign-in');
  }
};

//Create Comment
const createComment = async (req, res) => {
  try {
    const id = req.params.id;
    await Comment.create({
      text: req.body.commentText,
      user_id: req.session.userId,
      post_id: id,
    });
    res.status(200).send();
  } catch (err) {
    res.status(400).send();
  }
};

//Login User
const loginUser = async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;
      res.status(200).json({
        user: dbUserData,
        message: 'You are now logged in!',
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
      });
    });
  } catch (err) {}
};

//Create User
const createUser = async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (!dbUserData) {
      const userCreate = await User.create({
        name: req.body.name,
        password: req.body.password,
      });
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.userId = userCreate.id;
        res.status(200).json({ message: 'User created!' });
      });
    } else {
      res.status(409).json({ message: 'Username taken! Please use another.' });
      return;
    }
  } catch (err) {}
};

//Render Dashboard
const renderDashboard = async (req, res) => {
  if (req.session.loggedIn) {
    try {
      const getUserPosts = await Post.findAll({
        include: [{ model: User }],
        where: {
          user_id: req.session.userId,
        },
      });
      const plainPosts = getUserPosts.map((data) => data.get({ plain: true }));
      res.render('dash', {
        plainPosts,
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
      });
    } catch (err) {}
  } else {
    res.redirect('/sign-in');
  }
};

//Create Post
const createPost = async (req, res) => {
  try {
    await Post.create({
      postTitle: req.body.post_title,
      postText: req.body.post_text,
      user_id: req.session.userId,
    });
    res.status(200).send();
  } catch (err) {}
};

//Render Edit Page
const renderEdit = async (req, res) => {
  const editUser = await Post.findOne({
    include: [{ model: User }],
    where: { id: req.params.id },
  });
  if (req.session.loggedIn && req.body.id === editUser.id) {
    try {
      const plainPosts = editUser.get({ plain: true });
      res.render('edit', {
        plainPosts,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {}
  } else {
    res.redirect('/sign-in');
  }
};

//Edit a Post
const editPost = async (req, res) => {
  try {
    const id = req.params.id;
    Post.update(
      {
        postTitle: req.body.updateTitle,
        postText: req.body.updateText,
      },
      { where: { id: id } }
    ).then(() => {
      res.status(200).send();
    });
  } catch (err) {}
};

//Delete a Post
const deletePost = (req, res) => {
  try {
    const id = req.params.id;
    Post.destroy({ where: { id: id } }).then(() => {
      res.status(200).send();
    });
  } catch (err) {}
};

//Logout
const logout = (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(200).json({ message: 'You are now logged out!' });
    });
  } else {
  }
};

module.exports = {
  getAllPosts,
  getSinglePost,
  createComment,
  loginUser,
  createUser,
  logout,
  renderDashboard,
  createPost,
  renderEdit,
  editPost,
  deletePost,
};
