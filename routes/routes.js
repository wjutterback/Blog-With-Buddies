const router = require('express').Router();
const {
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
} = require('../controllers/controllers');

//Get All Posts/Homepage
router.get('/', (req, res) => {
  getAllPosts(req, res);
});

//Get One Post By ID
router.get('/post/:id', (req, res) => {
  getSinglePost(req, res);
});

//Create Comment
router.post('/post/:id', (req, res) => {
  createComment(req, res);
});

//Render Login page
router.get('/sign-in', (req, res) => {
  res.render('signin');
});

//Login User
router.post('/sign-in', async (req, res) => {
  loginUser(req, res);
});

router.get('/sign-up', (req, res) => {
  res.render('signup');
});

// Create new User
router.post('/sign-up', async (req, res) => {
  createUser(req, res);
});

// Logout
router.post('/logout', (req, res) => {
  logout(req, res);
});

//Render Dashboard
router.get('/dash', async (req, res) => {
  renderDashboard(req, res);
});

//Render new Post creation page
router.get('/postnew', (req, res) => {
  res.render('postnew', { loggedIn: req.session.loggedIn });
});

//Create new Post
router.post('/dash', async (req, res) => {
  createPost(req, res);
});

//Render edit page
router.get('/edit/:id', async (req, res) => {
  renderEdit(req, res);
});

//Edit Post
router.put('/edit/:id', async (req, res) => {
  editPost(req, res);
});

//Delete Post
router.delete('/edit/:id', async (req, res) => {
  deletePost(req, res);
});

module.exports = router;
