/**
 * Created by susisusi on 27/09/16.
 */
import { Router } from 'express';
import * as UserController from '../../controllers/User/user.controller';
const router = new Router();

// Get all Users
router.route('/users').get(UserController.getUsers);

// Get one user by cuid
router.route('/users/:cuid').get(UserController.getUser);

// Add a new User
router.route('/users').post(UserController.addUser);

export default router;

