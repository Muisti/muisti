import { Router } from 'express';
import * as ModuleController from '../controllers/module.controller';
const router = new Router();

//Get all modules
router.route('/modules').get(ModuleController.getModules);
//Get one module by title
router.route('/modules/:title').get(ModuleController.getModule);
//Add new module
router.route('/modules').post(ModuleController.addModule);
//Update a module
router.route('/modules').put(ModuleController.updateModule);
//Delete a module with cuid
router.route('/modules/:cuid').delete(ModuleController.deleteModule);

export default router;
