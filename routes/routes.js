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

//Get One Post By ID/Post New Comment
router
  .get('/post/:id', (req, res) => {
    getSinglePost(req, res);
  })
  .post('/post/:id', (req, res) => {
    createComment(req, res);
  });

//Render Login page/Login User
router
  .get('/sign-in', (req, res) => {
    res.render('signin');
  })
  .post('/sign-in', async (req, res) => {
    loginUser(req, res);
  });

//Render sign-up page and Create new User
router
  .get('/sign-up', (req, res) => {
    res.render('signup');
  })
  .post('/sign-up', async (req, res) => {
    createUser(req, res);
  });

//Render new Post creation page
router.get('/postnew', (req, res) => {
  res.render('postnew', { loggedIn: req.session.loggedIn });
});

//Render Dashboard
router
  .get('/dash', async (req, res) => {
    renderDashboard(req, res);
  })
  .post('/dash', async (req, res) => {
    createPost(req, res);
  });

//Edit page and change/delete Post.
router
  .get('/edit/:id', async (req, res) => {
    renderEdit(req, res);
  })
  .put('/edit/:id', async (req, res) => {
    editPost(req, res);
  })
  .delete('/edit/:id', async (req, res) => {
    deletePost(req, res);
  });

// Logout
router.post('/logout', (req, res) => {
  logout(req, res);
});

module.exports = router;
