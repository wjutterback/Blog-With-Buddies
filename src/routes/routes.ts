import * as express from 'express';
import * as path from 'path';
const router = express.Router();
import { User } from '../models/Users';

//TODO: try to wrap all routes/dry up route code stretch goal
//TODO: Use controller to pass in arguments/import functions
router.get('/', async (req, res) => {
  try {
    const userData: {
      map: (
        data
      ) => Array<{
        id: number;
        name: string;
        email: string;
        password: string;
      }>;
    } = await User.findAll();
    const plainData: Array<{
      id: number;
      name: string;
      email: string;
      password: string;
    }> = userData.map((data) => data.get({ plain: true }));
    console.log(plainData);
//TODO: 
    res.render('blog', plainData[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;