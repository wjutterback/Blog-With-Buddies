import * as express from 'express';
import * as path from 'path';
const router = express.Router();
import { User } from '../src/models/Users';

//TODO: try to wrap all routes/dry up route code stretch goal
//TODO: Use controller to pass in arguments/import functions
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();
    //TODO: TypeScript doesn't recognize .get({plain: true}) method
    // console.log(userData.get({ plain: true }));
    // res.status(200).json(userData);
    //TODO: Get data from userData into handlebars
    res.render('blog', userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
