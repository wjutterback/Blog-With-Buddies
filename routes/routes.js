const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { getAllPosts, getSinglePost } = require('../controllers/controllers');

router.get('/', (req, res) => {
  getAllPosts(req, res);
});

router.get('/post/:id', (req, res) => {
  getSinglePost(req, res);
});

router.post('/post/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const newComment = await Comment.create({
      text: req.body.commentText,
      user_id: req.session.userId,
      post_id: id,
    });
    res
      .status(200)
      .json({ newComment, message: 'Your comment has been posted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login page
router.get('/sign-in', async (req, res) => {
  try {
    res.render('signin');
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login User
router.post('/sign-in', async (req, res) => {
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
  } catch (err) {
    console.log(err);
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

// CREATE new user
router.post('/sign-up', async (req, res) => {
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
        res.status(200).json(userCreate);
      });
    } else {
      res.status(400).json({ message: 'Username taken! Please use another' });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/dash', async (req, res) => {
  const getUserPosts = await Post.findAll({
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
});

router.post('/dash', async (req, res) => {
  try {
    const postCreate = await Post.create({
      postTitle: req.body.post_title,
      postText: req.body.post_text,
      user_id: req.session.userId,
    });
    res.status(200).json({ postCreate, message: 'Your post has been created' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/postnew', async (req, res) => {
  try {
    res.render('postnew', { loggedIn: req.session.loggedIn });
  } catch (err) {}
});

router.get('/edit/:id', async (req, res) => {
  try {
    const id = req.params.id;
    Post.findOne({
      where: { id: id },
    }).then((postData) => {
      const plainPosts = postData.get({ plain: true });
      console.log(plainPosts);
      res.render('edit', {
        plainPosts,
        loggedIn: req.session.loggedIn,
      });
    });
  } catch (err) {}
});

router.put('/edit/:id', async (req, res) => {
  try {
    const id = req.params.id;
    Post.update(
      {
        postTitle: req.body.updateTitle,
        postText: req.body.updateText,
      },
      { where: { id: id } }
    ).then((response) => {
      console.log(response);
      res.status(200).json({ message: 'Your post has been updated' });
    });
  } catch (err) {}
});

module.exports = router;
