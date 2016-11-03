import { Router } from 'express';
import * as SectionController from '../controllers/section.controller';
const router = new Router();

router.route('/sections/:moduleCuid').get(SectionController.getSections);

router.route('/sections').post(SectionController.addSection);

export default router;