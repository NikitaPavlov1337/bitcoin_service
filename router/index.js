import { Router } from 'express';
import BtcController from '../controller/BtcController.js';

// Роуты для серверного API

const router = new Router();

router.get('/btcs', BtcController.getAll);
router.get('/btcs/period', BtcController.getDataPeriod);

export default router;
