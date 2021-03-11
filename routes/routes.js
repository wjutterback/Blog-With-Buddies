const express = require('express');
const path = require('path');
const router = express.Router();
const { getAllPosts, getSinglePost } = require('../controllers/controllers');

// const commentData = await Comment.findAll();

router.get('/', (req, res) => {
  getAllPosts(req, res);
});

router.get('/post/:id'),
  (req, res) => {
    getSinglePost(req, res);
  };

router.get('/sign-in', async (req, res) => {
  try {
    res.render('signin');
  } catch (err) {
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

router.post('/sign-up', async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
