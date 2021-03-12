const router = require('express').Router();
const User = require('../models/User');
const { getAllPosts, getSinglePost } = require('../controllers/controllers');

// const commentData = await Comment.findAll();

router.get('/', (req, res) => {
  getAllPosts(req, res);
});

router.get('/post/:id', (req, res) => {
  getSinglePost(req, res);
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
      res.status(200).json({
        user: dbUserData,
        message: 'You are now logged in!',
        loggedIn: req.session.loggedIn,
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
      const dbUserData = await User.create({
        name: req.body.name,
        password: req.body.password,
      });
      req.session.save(() => {
        req.session.loggedIn = true;

        res.status(200).json(dbUserData);
      });
    } else {
      res.status(400).json({ message: 'Username taken! Please use another' });
      return;
    }
  } catch (err) {
    console.log(err);
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

router.get('/dash', (req, res) => {});

module.exports = router;
