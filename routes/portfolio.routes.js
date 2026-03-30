import { Router } from 'express';
import { showHome } from '../controllers/portfolio.controller.js';

const router = Router();

router.get('/', showHome);

export default router;
