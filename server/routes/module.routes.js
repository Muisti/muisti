import { Router } from 'express';
import * as ModuleController from '../controllers/module.controller';
const router = new Router();

router.route('/modules').get(ModuleController.getModules);

router.route('/modules/:title').get(ModuleController.getModule);

router.route('/modules').post(ModuleController.addModule);

export default router;
