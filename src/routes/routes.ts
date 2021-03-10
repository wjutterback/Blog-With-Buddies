import * as express from 'express';
import * as path from 'path';
const router = express.Router();
import { User } from '../models/Users';

//TODO: try to wrap all routes/dry up route code stretch goal
//TODO: Use controller to pass in arguments/import functions
type dbUser = Array<{
  id: number;
  name: string;
  email: string;
  password: string;
}>;

router.get('/', async (req, res) => {
  try {
    const userData: {
      map: (data) => dbUser;
    } = await User.findAll();
    const plainData: dbUser = userData.map((data) => data.get({ plain: true }));
    console.log(plainData);
    //TODO:
    res.render('blog', plainData);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
