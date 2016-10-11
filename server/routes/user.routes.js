import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

//Add a new user
router.route('/users').post(UserController.addUser);

router.route('/users').get(UserController.getUsers);

router.route('/users/:email').get(UserController.getUser);

router.route('/login/:email/:password').get(UserController.getToken);

//Confirm user account (through link sent in confirmation email)
router.route('/confirmation/:code').get(UserController.confirmUserAccount);

export default router;

