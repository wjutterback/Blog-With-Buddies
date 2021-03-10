import * as express from 'express';
import * as path from 'path';
const router = express.Router();
import { User } from '../models/Users';

//TODO: try to wrap all routes/dry up route code stretch goal
//TODO: Use controller to pass in arguments/import functions
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({ plain: true });
    console.log(userData);
    //TODO: Get data from userData into handlebars
    res.render('blog', userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
