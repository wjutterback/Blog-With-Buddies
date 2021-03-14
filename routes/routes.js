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

router.post('/post/:id', (req, res) => {
  const id = req.params.id;
  Comment.create({
    text: req.body.commentText,
    user_id: req.session.userId,
    post_id: id,
  }).then(() => {
    res.status(200).send();
  });
});

//Login page
router.get('/sign-in', (req, res) => {
  res.render('signin');
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
  } catch (err) {}
});

router.get('/sign-up', (req, res) => {
  res.render('signup');
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
        res.status(200).send();
      });
    } else {
      res.status(409).json({ message: 'Username taken! Please use another.' });
      return;
    }
  } catch (err) {}
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(200).json({ message: 'You are now logged out!' });
    });
  } else {
  }
});

router.get('/dash', async (req, res) => {
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
});

router.post('/dash', async (req, res) => {
  try {
    const postCreate = await Post.create({
      postTitle: req.body.post_title,
      postText: req.body.post_text,
      user_id: req.session.userId,
    });
    res.status(200).send();
  } catch (err) {}
});

router.get('/postnew', (req, res) => {
  res.render('postnew', { loggedIn: req.session.loggedIn });
});

router.get('/edit/:id', async (req, res) => {
  try {
    const id = req.params.id;
    Post.findOne({
      include: [{ model: User }],
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
    ).then(() => {
      res.status(200).send();
    });
  } catch (err) {}
});

router.delete('/edit/:id', async (req, res) => {
  try {
    const id = req.params.id;
    Post.destroy({ where: { id: id } }).then(() => {
      res.status(200).send();
    });
  } catch (err) {}
});

module.exports = router;
