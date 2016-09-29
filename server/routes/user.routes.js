import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

//Add a new user
router.route('/users').post(UserController.addUser);

router.route('/users/:email').get(UserController.getUser);

export default router;