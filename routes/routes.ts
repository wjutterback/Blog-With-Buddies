import * as express from 'express';
import * as path from 'path';
const router = express.Router();
import { User } from '../src/models/Users';

//TODO: try to wrap all routes/dry up route code stretch goal
//TODO: Use controller to pass in arguments/import functions
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
